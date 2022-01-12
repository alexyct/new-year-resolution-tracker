import React from 'react';
import classes from './Overview.module.css';

import BarGraph from './BarGraph';

const Overview = (props) => {
  //   process data
  console.log(props.data);
  let totalHours = 0;
  // TODO: get from props
  let lastWeekHours = 1.2;
  for (let i = 1; i < props.data.length; i++) {
    let item = props.data[i];
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
            diffSign == 1 ? classes.positive : classes.negative,
          ].join(' ')}
        >
          {diffSign == 1 ? <>&#11014;</> : <>&#11015;</>}
          {hoursDiff}h {minutesDiff}m from last week
        </h2>
      </div>
      <BarGraph google={props.google} data={props.data} width={props.width} />
    </div>
  );
};

export default Overview;
