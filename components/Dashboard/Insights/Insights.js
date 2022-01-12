import React from "react";
import classes from "./Insights.module.css";

const Insights = (props) => {
  console.log(props);
  let insights = null;

  insights = props.insights.map((item) => {
    return <li>{item}</li>;
  });

  return (
    <div className={classes.insights}>
      <h1>Insights</h1>
      <ul>{insights}</ul>
    </div>
  );
};

export default Insights;
