import React from "react";
import classes from "./LogEntry.module.css";

import Select from "@/components/Select/Select";
import Input from "@/components/Input/Input";

const LogEntry = (props) => {
  return (
    <div className={classes.entryWrapper}>
      <p className={classes.entryTitle}>{props.title}</p>
      <div className={classes.selectWrapper}>
        {props.options ? (
          <Select options={props.options} />
        ) : (
          <Input
            type="time"
            value={props.value}
            step="900"
            custom
            changed={props.changed}
          />
        )}
      </div>
    </div>
  );
};

export default LogEntry;
