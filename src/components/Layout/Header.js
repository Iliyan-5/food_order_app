import React from "react";
import classes from './Header.module.css'

import mealsImage from '../../assets/foodPicture.jpeg'
import HeaderCartButton from "./HeaderCartButton";
import LogoutButton from "../Logout/LogoutButton";
const Header = (props) => {
  
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Пицария Флора</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
        <LogoutButton/>
      </header> 
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='Atable full of delicious food'></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
