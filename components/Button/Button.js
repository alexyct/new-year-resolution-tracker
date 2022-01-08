import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  let classArray = [classes.button];

  if (props.primary) {
    classArray.push(classes.primary);
  } else if (props.secondary) {
    classArray.push(classes.secondary);
  } else if (props.tertiary) {
    classArray.push(classes.tertiary);
  } else {
    classArray.push(classes.primary);
  }

  if (props.color === "blue") {
    classArray.push(classes.blue);
  } else if (props.color === "orange") {
    classArray.push(classes.orange);
  } else if (props.color === "red") {
    classArray.push(classes.red);
  } else if (props.color === "grey") {
    classArray.push(classes.grey);
  } else if (props.color === "black") {
    classArray.push(classes.black);
  } else {
    classArray.push(classes.blue);
  }

  if (props.size === "large") {
    classArray.push(classes.large);
  } else if (props.size === "medium") {
    classArray.push(classes.medium);
  } else if (props.size === "small") {
    classArray.push(classes.small);
  } else {
    classArray.push(classes.medium);
  }

  props.round && classArray.push(classes.round);
  props.narrow && classArray.push(classes.narrow);
  props.fullHeight && classArray.push(classes.fullHeight);

  const buttonClass = classArray.join(" ");
  // console.log(buttonClass);

  return (
    <button
      className={buttonClass}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
