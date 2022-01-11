import React from "react";
import classes from "./Resolution.module.css";

const Resolution = (props) => {
  let { quantity, unit, frequency } = { props };
  quantity = 2;
  unit = "times";
  frequency = "week";
  return (
    <div className = {classes.resolution}>
      <h1>Your 2022 Resolution</h1>
      <h3>
        "I will exercise {quantity} {unit} every {frequency}"
      </h3>
    </div>
  );
};

export default Resolution;
