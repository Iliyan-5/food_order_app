import React, { useContext, useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./Signup.module.css";
import AuthContext from "../../store/auth-context";
import AuthInput from "../UI/AuthInput";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../DB/firebase";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const [passwordIsValid, setPasswordIsValid] = useState();

  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState();
  const [invalidSignUp, setInvalidSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    setEnteredConfirmPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateConfirmPasswordHandler = () => {
    setConfirmPasswordIsValid(
      enteredPassword === enteredConfirmPassword && passwordIsValid
    );
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(auth);

    await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setInvalidSignUp(true);
        setErrorMessage(errorMessage.replace("Firebase:", ""));
      });
  };

  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Pizza Flora</h1>
      </header>
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <AuthInput
            label="E-Mail"
            isValid={emailIsValid}
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <AuthInput
            label="Password"
            isValid={passwordIsValid}
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          <AuthInput
            label="Confirm Password"
            isValid={confirmPasswordIsValid}
            type="password"
            id="confirmPassword"
            value={enteredConfirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={validateConfirmPasswordHandler}
          />

          {invalidSignUp && <p1 style={{ color: "red" }}>{errorMessage}</p1>}

          <div className={classes.actions}>
            <button type="submit" className={classes.button}>
              Sign up
            </button>
          </div>
        </form>

        <p>
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </p>
      </Card>
    </React.Fragment>
  );
};

export default Login;
