import React, { useContext, useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./Login.module.css";
import AuthContext from "../../store/auth-context";
import AuthInput from "../UI/AuthInput"

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    
    authContext.onLogin(enteredEmail,enteredPassword);
    console.log(authContext.isLoggedIn)
  };

  return (
    <React.Fragment>
    <header className={classes.header}>
      <h1>ReactMeals</h1>
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
      
        <div className={classes.actions}>
          <button type="submit" className={classes.button}>
            Login
          </button>
        </div>
      </form>
    </Card>
    </React.Fragment>
  );
};

export default Login;
