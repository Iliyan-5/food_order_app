import React, { useContext, useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./Login.module.css";
import AuthContext from "../../store/auth-context";
import AuthInput from "../UI/AuthInput"
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../DB/firebase";


const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };


  const submitHandler = (event) => {
    setInvalidLogin(false)
    event.preventDefault();
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setInvalidLogin(true)
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
          label="E-Mail Test"
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
        />
        <AuthInput
          label="Password Test"
          type="password"
          id="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
        />
        {invalidLogin && <p1 style = {{color:"red"}}>{errorMessage}</p1>}
        <div className={classes.actions}>
          <button type="submit" className={classes.button}>
            Login
          </button>
        </div>
      </form>
      
      <p className="text-sm text-white text-center">
              No account yet? <NavLink to="/signup">Sign up</NavLink>
            </p>
    </Card>
    </React.Fragment>
  );

//test 
  // return (
  //   <React.Fragment>
  //   <header className={classes.header}>
  //     <h1>ReactMeals</h1>
  //   </header> 
  //   <Card className={classes.login}>
  //     <form onSubmit={submitHandler}>
  //       <AuthInput
  //         label="E-Mail"
  //         isValid={emailIsValid}
  //         type="email"
  //         id="email"
  //         value={enteredEmail}
  //         onChange={emailChangeHandler}
  //         onBlur={validateEmailHandler}
  //       />
  //       <AuthInput
  //         label="Password"
  //         isValid={passwordIsValid}
  //         type="password"
  //         id="password"
  //         value={enteredPassword}
  //         onChange={passwordChangeHandler}
  //         onBlur={validatePasswordHandler}
  //       />
      
  //       <div className={classes.actions}>
  //         <button type="submit" className={classes.button}>
  //           Login
  //         </button>
  //       </div>
  //     </form>
  //   </Card>
  //   </React.Fragment>
  // );
//

};

export default Login;
