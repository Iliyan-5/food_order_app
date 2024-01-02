import React, { useContext, useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./Signup.module.css";
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
  const [errorMessage, setErrorMessage] = useState("");

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
    if (!confirmPasswordIsValid) {
      setInvalidSignUp(true);
      setErrorMessage("Невалидна парола!");
    } else {
      await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setInvalidSignUp(true);
          setErrorMessage(
            "Невалиден имейл! Моля уверете се, че имейлът е правилен, или че вече не съществува акаунт с такъв имейл!"
          );
        });
    }
  };

  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Пицария Флора</h1>
      </header>
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <AuthInput
            label="Имейл"
            isValid={emailIsValid}
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <AuthInput
            label="Парола"
            isValid={passwordIsValid}
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          <AuthInput
            label="Потвърди парола"
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
              Създай акаунт
            </button>
          </div>
        </form>

        <p>
          Вече имаш акаунт? <NavLink to="/login">Вписване</NavLink>
        </p>
      </Card>
    </React.Fragment>
  );
};

export default Login;
