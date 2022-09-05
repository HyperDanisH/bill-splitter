import React, { useEffect } from "react";
import "./base-page.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebase";
import Img from "../../imgs/bg-img.jpg";

const BasePage = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          navigate("/dashboard");
        } else {
          return;
        }
      },
      []
    );
  });
  return (
    <>
      <div className="base-container">
        <img src={Img} alt="" />{" "}
        <h1>
          Split the <span> bills you pay equaly </span>
        </h1>
        <p>
          Created by Danish arora for you and your friends. I am a front-end
          self learning programmer please don't forget to upvote me!
        </p>
        <div className="btns">
          <Link className="signIn" to="/sign-up">
            <p className="signUp">Sign Up</p>
          </Link>
          <Link className="login" to="/log-in">
            <p className="login">Log In</p>
          </Link>
        </div>
        <p className="creator">CREATED BY DANISH ARORA</p>
      </div>
    </>
  );
};

export default BasePage;
