import React, { useState } from "react";
import "../dashboard/dashboard.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const Header = () => {
  const user = auth.currentUser;
  const [dataFromLocalStorage, setDataFromLocalStorage] = useState({
    data: [],
  });
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="name-container">
        {user ? user.displayName : "Anonymous"}
      </div>
      <div className="button-container-signout">
        <button
          className="create-group dashboard-signup"
          onClick={() => {
            const func = async () => {
              const keys = Object.keys(localStorage);
              keys.forEach((key) => {
                dataFromLocalStorage.data.push(
                  JSON.parse(localStorage.getItem(key))
                );
              });
              const setDocRef = async () => {
                const docRef = doc(db, "userProducts", user && user.uid);
                const setDocRef = await setDoc(
                  docRef,
                  dataFromLocalStorage
                ).then(() => {
                  console.log("data uploaed");
                });
              };
              signOut(auth).then(() => {
                localStorage.clear();
                navigate("/");
              });

              // for (let key in localStorage) {

              // }
              // console.log(dataFromLocalStorage);
            };
            func();
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Header;
