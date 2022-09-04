import { doc, getDoc } from "firebase/firestore";
import "./personalScreen.css";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/firebase";

const PersonalScreen = ({ pathRefProp }) => {
  const [groupDocWithUidStorage, setGroupDocWithUidStorage] = useState({});
  const [localStorageRef, setLocalStorageRef] = useState({});
  useEffect(() => {
    const fecthGroupDoc = async () => {
      const docRef = doc(db, "groups", auth && auth.currentUser.uid);
      const fetchRef = await getDoc(docRef);
      if (fetchRef.exists()) {
        setGroupDocWithUidStorage(fetchRef.data());

        // const interval = setInterval(() => {
        fetchRef &&
          fetchRef.data().totalNamesInList.forEach((element) => {
            if (element.email === pathRefProp) {
              console.log(element.email);
              setLocalStorageRef(
                JSON.parse(localStorage.getItem(element.name))
              );
              // console.log(localStorageRef);
              //   clearInterval();
              //   return;
            }
            // return;
          });
        // }, 300);
        // clearInterval();
      } else {
        console.log("not worked");
      }
    };
    fecthGroupDoc();
    // console.log(pathRefProp);
  }, [pathRefProp]);
  return (
    <div className="amount-screen personal-screen">
      <div className="bill-list">
        {localStorageRef.productNames !== undefined
          ? localStorageRef.productPrices.map((item, index) => {
              return (
                <>
                  <p>
                    {localStorageRef.productNames[index]} : {item}
                  </p>
                </>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default PersonalScreen;
