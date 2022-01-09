import Button from "components/Button/Button";
import React from "react";
import classes from "./LogData.module.css";

import LogEntry from "./LogEntry/LogEntry";

const LogData = (props) => {
  const date = "January 8th 2022";

  const exerciseOptions = ["workout", "basketball", "football"];
  const timeOptions = ["0:00", "0:15", "0:30"];

  let logData = (
    <div className={classes.logData}>
      <div className={classes.dateWrapper}>
        <h1 className={classes.date}>{date}</h1>
      </div>
      <div className={classes.entries}>
        <LogEntry title={"Exercise type"} options={exerciseOptions} />
        <LogEntry title={"Start time"} options={timeOptions} />
        <LogEntry title={"End time"} options={timeOptions} />
      </div>
      <div className={classes.buttonWrapper}>
        <Button tertiary narrow>
          Log it
        </Button>
      </div>
    </div>
  );

  return <div>{logData}</div>;
};

export default LogData;
