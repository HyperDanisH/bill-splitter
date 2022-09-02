import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "../login/login.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const auth = getAuth(app);
  return (
    <div className="login-container">
      <div className="container">
        <h1>Sign In to bill-splitter</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(auth, email, password)
              .then(() => {
                updateProfile(auth.currentUser, {
                  displayName: name,
                });
              })
              .then((user) => {
                navigate("/");
              });
          }}
        >
          <div className="box">
            <input
              type="text"
              name="text"
              id="email"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Your FullName"
            />
          </div>
          <div className="box">
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
                console.log(email);
              }}
              placeholder="Enter Your E-mail"
            />
          </div>

          <div className="box">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Passcode"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" class="btn">
            SIGN-IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
