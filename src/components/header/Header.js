import React from "react";
import "../dashboard/dashboard.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = auth.currentUser;
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
            signOut(auth)
              // .then(() => {
              //           const addDoc = setDoc(
              //             doc(db, "userProducts", auth.currentUser.uid),

              //           );
              //         })
              .then(() => {
                localStorage.clear();
                navigate("/");
              });
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Header;
