import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { createContext, useState } from "react";
import { auth, db } from "../firebase/firebase";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const user = auth.currentUser;
  const [isAddAmountOpen, setIsAddAmountOpen] = useState(true);
  const [toSetRoutesIfDatIsProvided, setToSetRoutesIfDatIsProvided] =
    useState(false);
  const [groupDocData, setGroupDocData] = useState({
    totalNamesInList: [
      {
        email: "",
        name: "",
      },
    ],
  });

  const fecthGroupDoc = async () => {
    setTimeout(async () => {
      const docRef = doc(
        db,
        "groups",
        auth.currentUser.uid && auth.currentUser.uid
      );
      const docSnap = await getDoc(docRef);
      console.log("Please wait");
      if (docSnap.exists()) {
        setGroupDocData(docSnap.data());
        setToSetRoutesIfDatIsProvided(true);
        console.log(toSetRoutesIfDatIsProvided);
      } else {
        // alert("Not found data in db, retry creating group");
        setToSetRoutesIfDatIsProvided(false);
      }
      console.log("the func was success");
    }, 1000);
  };

  return (
    <DashboardContext.Provider
      value={{
        isAddAmountOpen,
        setIsAddAmountOpen,
        fecthGroupDoc,
        groupDocData,
        toSetRoutesIfDatIsProvided,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
