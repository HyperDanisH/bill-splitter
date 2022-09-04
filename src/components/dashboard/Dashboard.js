import React, { useState, useEffect, useContext } from "react";
import "./dashboard.css";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";
import Header from "../header/Header";
import PeopleJoined from "../dashboardComponents/peopleJoined/PeopleJoined";
import AmountScreen from "../dashboardComponents/amountScreen/AmountScreen";
import DashboardContext from "../../context/DashboardContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [name, setName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [keyIsFoundInDataBase, setKeyIsFoundInDataBase] = useState(false);
  const [data, setData] = useState({});
  const groupRef = collection(db, "groups");
  const { fecthGroupDoc, groupDocData, setDataIsLoaded } =
    useContext(DashboardContext);

  const func = async () => {
    const user = auth.currentUser;
    // const groupsColl = collection(db, "groups");

    // try {
    if (user != null) {
      console.log("ok");
      const docRef = doc(
        db,
        "groups",
        auth.currentUser.uid && auth.currentUser.uid
      );
      // if (docRef == null) {
      //   setKeyIsFoundInDataBase(false);
      //   return;
      // }

      const fetchDocData = await getDoc(docRef);
      // .then((data) => {
      // console.log("this is done");
      // if (data.exists) {
      //   setKeyIsFoundInDataBase(true);
      //   setData(data.data());
      //   console.log("data is found");
      //   // clearInterval();
      // } else {
      //   setKeyIsFoundInDataBase(false);
      //   console.log("data not found");
      // }
      console.log(fetchDocData);
      // });
      if (fetchDocData.exists()) {
        if ("email" in fetchDocData.data().totalNamesInList[0] !== undefined) {
          setKeyIsFoundInDataBase(true);
        } else {
          console.log("I'm right here");
        }
      }
      // fetchDocData();
    }
    // } catch (error) {
    // console.log(error.message);
    // }
  };

  // window.onload = () => {
  //   func();
  // };
  // window.addEventListener("resize", () => {
  //   func();
  // });
  // window.addEventListener("DOMContentLoaded", () => {
  //   func();
  // });
  useEffect(() => {
    setTimeout(() => {
      fecthGroupDoc();
      func();
    }, 1000);
    // setInterval(() => {
    // }, 1000);
    // document.addEventListener("DOMContentLoaded", (e) => {
    // return () => {
    //   func();
    // };
    // });
    return () => {
      console.log("The use effect is fired");
      console.log(keyIsFoundInDataBase);
      setTimeout(() => {
        fecthGroupDoc();
        if (groupDocData.exists) {
          setData(groupDocData);
          setDataIsLoaded(true);
          console.log("..");
        }
      }, 3000);
    };
  }, []);
  // window.onload = func;

  const createGroupInDb = () => {
    try {
      const adddoc = setDoc(doc(db, "groups", user.uid), {
        groupName: name,
        adminName: adminName,
      }).then(() => {
        navigate("/joined-group");
        // navigate("/");
      });
    } catch (error) {
      // alert(error.message);
    }
  };

  const [toogleCreateMenu, setToogleCreateMenu] = useState(false);

  const handleToogle = () => {
    setToogleCreateMenu(!toogleCreateMenu);
  };

  return (
    <div className="dashboard">
      <Header />
      {keyIsFoundInDataBase ? (
        <>
          <div className="main-dashboard">
            <PeopleJoined />
            <Outlet />
          </div>
        </>
      ) : (
        <>
          {toogleCreateMenu ? (
            <>
              <div className="add-group-menu">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createGroupInDb();
                  }}
                >
                  <input
                    type="text"
                    name="text"
                    id="text"
                    placeholder="Enter admin's name"
                    onChange={(e) => {
                      setAdminName(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    name="text"
                    id="text"
                    placeholder="Enter group name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <div className="btns-dashboard-add-group-menu">
                    <button
                      type="submit"
                      className="btn-dashboard-add-group create-group dashboard-signup btn-dashboard-add-group sldjf"
                    >
                      Create
                    </button>
                    <button
                      className="create-group dashboard-signup classic "
                      onClick={handleToogle}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <button className="create-group" onClick={handleToogle}>
                Create Group
              </button>
            </>
          )}
          {/* <div className="user-details">
        {user ? user.displayName : "Anonymous"} &#9830; {user && user.email}
      </div> */}
        </>
      )}
    </div>
  );
};

export default Dashboard;
