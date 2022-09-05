import "./App.css";
import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  BasePage,
  Dashboard,
  Group,
  Login,
  SignIn,
  PersonalScreen,
} from "./components";
import { auth } from "./firebase/firebase";
import AmountScreen from "./components/dashboardComponents/amountScreen/AmountScreen";
import DashboardContext from "./context/DashboardContext";
import { useNavigate } from "react-router-dom";

function App() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isDataLoaded, setDataIsLoaded] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [totalNamesInList, setTotalNamesInList] = useState([]);
  const { fecthGroupDoc, groupDocData, toSetRoutesIfDatIsProvided } =
    useContext(DashboardContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });

    return () => {
      setTimeout(() => {
        fecthGroupDoc();
        if (groupDocData.exists()) {
          setData(groupDocData);
          setTotalNamesInList([
            ...totalNamesInList,
            groupDocData.data().totalNamesInList,
          ]);
          setDataIsLoaded(true);
          console.log("success here");
        }
      }, 3000);
    };
  }, [auth]);

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<BasePage />} /> */}
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignIn />} />

        <Route
          path="/"
          element={isUserLoggedIn ? <Dashboard /> : <BasePage />}
        />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-amount" element={<AmountScreen />} />
          {groupDocData.totalNamesInList != undefined &&
          toSetRoutesIfDatIsProvided
            ? groupDocData.totalNamesInList.map((item) => {
                console.log(item);
                return (
                  <>
                    <Route
                      path={item.email}
                      element={<PersonalScreen pathRefProp={item.email} />}
                      key={item.name}
                    />
                  </>
                );
              })
            : null}
        </Route>

        <Route path="/joined-group" element={<Group />} />
      </Routes>
    </div>
  );
}

export default App;
