import React, { useState, useEffect, useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import AuthContext from "./store/auth-context";
function App() {
  const authContext = useContext(AuthContext)
  return (
        <React.Fragment>
          {console.log(authContext.isLoggedIn)}
        {!authContext.isLoggedIn && <Login  />}
        
        {authContext.isLoggedIn && <Home  />}
        </React.Fragment>

  );
}

export default App;
