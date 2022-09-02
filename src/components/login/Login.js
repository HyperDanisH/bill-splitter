import React, { useState } from "react";
import "./login.css";
import { app } from "../../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);
  return (
    <div className="login-container">
      <div class="container">
        <h1>Login To bill-splitter</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signInWithEmailAndPassword(auth, email, password);
          }}
        >
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

export default Login;

// <div className="login-container">
//   <div className="input-containers">
//     <input type="email" name="email" id="email" className="login-signin" />
//     <input
//       type="password"
//       name="password"
//       id="password"
//       className="login-signin"
//     />
//   </div>
// </div>
