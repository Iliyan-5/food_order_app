import React from "react";
import classes from "./LogoutButton.module.css";
import logoutImage from "../../assets/logoutIcon.png";
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
      })
      .catch((error) => {
        console.log(error.message)
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
