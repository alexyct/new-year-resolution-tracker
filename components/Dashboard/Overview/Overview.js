import React from "react";
import classes from "./Overview.module.css";

import BarGraph from "./BarGraph";

const Overview = (props) => {
  //   process data
  const data = props.data;
  if (data.length > 0) {
    let exerciseDict = {};
    // populate dict
    for (let i = 0; i < data[0].length; i++) {
      exerciseDict[data[0][i]] = 0;
    }
    for (let i = 1; i < data.length; i++) {
      let item = data[i];
      for (let j = 3; j < item.length; j++) {
        exerciseDict[data[0][j]] += item[j];
      }
    }
    console.log(exerciseDict);

    // drop empty columns
    // loop through all the columns backwards:
    for (let i = data[0].length - 1; i >= 3; i--) {
      let key = data[0][i];
      if (exerciseDict[key] === 0) {
        // drop column for every row
        for (let j = 0; j < data.length; j++) {
          data[j].splice(i, 1);
        }
      }
    }
  }
  let totalHours = 0;
  // TODO: get from props
  let lastWeekHours = props.lastWeek || 0;
  for (let i = 1; i < data.length; i++) {
    let item = data[i];
    for (let j = 3; j < item.length; j++) {
      totalHours += item[j];
    }
  }
  let average = totalHours / 7;
  let hours = Math.floor(average);
  let minutes = Math.floor((average % 1) * 60);

  let diffToGoal = (totalHours - lastWeekHours * 7) / 7;
  let diffSign = Math.sign(diffToGoal);
  diffToGoal = Math.abs(diffToGoal);
  let hoursDiff = Math.floor(diffToGoal);
  let minutesDiff = Math.floor((diffToGoal % 1) * 60);

  return (
    <div>
      <h1 className={classes.overviewTitle}>This week&apos;s average</h1>
      <div className={classes.hourCount}>
        <h1 className={classes.totalHours}>
          {hours}h {minutes}m
        </h1>
        <h2
          className={[
            classes.diffLabel,
            diffSign == -1 ? classes.negative : classes.positive,
          ].join(" ")}
        >
          {diffSign == -1 ? <>&#11015;</> : <>&#11014;</>}
          {hoursDiff}h {minutesDiff}m from last week
        </h2>
      </div>
      <BarGraph google={props.google} data={data} width={props.width} />
    </div>
  );
};

export default Overview;
