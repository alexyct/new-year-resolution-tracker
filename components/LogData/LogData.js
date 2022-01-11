import React from "react";
import classes from "./LogData.module.css";

import LogEntry from "./LogEntry/LogEntry";
import Button from "components/Button/Button";

function dateToString(date) {
  let day;
  if (!date) {
    day = new Date();
  } else {
    day = new Date(date);
  }
  var dd = String(day.getDate()).padStart(2, "0");
  var mm = String(day.getMonth() + 1).padStart(2, "0");
  var yyyy = day.getFullYear();
  day = mm + "/" + dd + "/" + yyyy;
  return day;
}

const LogData = (props) => {
  const exerciseOptions = [
    "Walk",
    "Run",
    "Cycling",
    "Rower",
    "HIIT",
    "Hiking",
    "Yoga",
    "Dance",
    "Strength Training",
    "Swimming",
  ];

  let logData = (
    <div className={classes.logData}>
      <div className={classes.dateWrapper}>
        <h1 className={classes.date}>{dateToString(props.date)}</h1>
      </div>
      <div className={classes.entries}>
        <LogEntry
          title={"Exercise type"}
          options={exerciseOptions}
          changed={props.exerciseTypeChangedHandler}
          value={props.logData.exercise}
        />
        <LogEntry
          title={"Start time"}
          changed={props.startTimeChangedHandler}
          value={props.logData.startTime}
        />
        <LogEntry
          title={"End time"}
          changed={props.endTimeChangedHandler}
          value={props.logData.endTime}
        />
      </div>
      <div className={classes.buttonWrapper}>
        <Button
          color="black"
          tertiary
          narrow
          clicked={props.logButtonClickedHandler}
        >
          Log it
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Button tertiary color="black" narrow>
        Back
      </Button>
      {logData}
    </div>
  );
};

export default LogData;
