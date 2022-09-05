import { doc, getDoc } from "firebase/firestore";
import "./personalScreen.css";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import UnVerified from "../../../imgs/verified-icon.png";
import Verified from "../../../imgs/verified-icon-1.png";

const PersonalScreen = ({ pathRefProp }) => {
  const [groupDocWithUidStorage, setGroupDocWithUidStorage] = useState({});
  const [localStorageRef, setLocalStorageRef] = useState({});
  const [localStorageRefToBePassed, setLocalStorageRefToBePassed] = useState(
    {}
  );
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
      <div className="mark">
        <h1>
          Mark
          <img src={UnVerified} alt="" />
          when user pays you back
        </h1>
      </div>
      <div className="bill-list">
        <div className="unpaid">
          <h1>Un paid amount</h1>
          {localStorageRef.productNames !== undefined
            ? localStorageRef.productPrices.map((item, index) => {
                if (item !== null) {
                  const handleVerifyClick = () => {
                    const newPersonName = [];
                    newPersonName.push(localStorageRef.productNames[index]);
                    setLocalStorageRefToBePassed(localStorageRef);
                    localStorageRefToBePassed.paidProducts.push(
                      localStorageRef.productNames[index]
                    );
                    console.log(localStorageRefToBePassed);
                    localStorageRef.personName !== undefined &&
                      localStorage.setItem(
                        localStorageRef.personName,
                        JSON.stringify(localStorageRefToBePassed)
                      );
                  };
                  return (
                    <>
                      <div className="container-perosns">
                        <p>
                          {localStorageRef.productNames[index]} : {item}
                          <button onClick={handleVerifyClick}>
                            <img src={UnVerified} alt="" />
                          </button>
                        </p>
                      </div>
                    </>
                  );
                }
              })
            : null}
        </div>
        <div className="paid">
          <h1>Paid amount</h1>
          {localStorageRef.paidProducts !== undefined &&
          localStorageRef.paidProducts !== []
            ? localStorageRef.paidProducts.map((item, index) => {
                return (
                  <>
                    <p key={index.toString()}>
                      {item}
                      <img src={Verified} alt="" />
                    </p>
                  </>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default PersonalScreen;
