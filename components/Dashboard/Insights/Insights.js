import React from 'react';
import classes from './Insights.module.css';

const Insights = (props) => {
  let insights = null;

  insights = props.insights.map((item, i) => {
    return <li key={i}>{item}</li>;
  });

  return (
    <div className={classes.insights}>
      <ul>{insights}</ul>
    </div>
  );
};

export default Insights;
