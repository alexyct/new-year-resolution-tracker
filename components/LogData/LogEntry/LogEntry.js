import React from "react";
import classes from "./LogEntry.module.css";

import Select from "@/components/Select/Select";

const LogEntry = (props) => {
  return (
    <div className={classes.entryWrapper}>
      <p className={classes.entryTitle}>{props.title}</p>
      <div className={classes.selectWrapper}>
        <Select options={props.options} />
      </div>
    </div>
  );
};

export default LogEntry;
