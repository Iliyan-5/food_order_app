import React from "react";
import classes from './Card.module.css';

const Card = (props) =>{
  const liClasses = `${classes.card} ${props.className}`
  return <div className={liClasses}>{props.children}</div>
}

export default Card;