import React from "react";
import classes from "./LogoutButton.module.css";
import logoutImage from "../../assets/icon1.png";
import { signOut } from "firebase/auth";
import { auth } from "../DB/firebase";
import { useNavigate } from "react-router-dom";

const HeaderLogoutButton = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/Login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <button className={classes.logoutButton} onClick={handleLogout}>
      <span className={classes.icon}>
        <img
          className={classes.icon}
          src={logoutImage}
          alt="logout"
          fill="currentColor"
        ></img>
      </span>
    </button>
  );
};
export default HeaderLogoutButton;
