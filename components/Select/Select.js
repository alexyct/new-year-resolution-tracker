import React from "react";
import classes from "./Select.module.css";

const Select = (props) => {
  const hideArrow = props.disabled ? "true" : "false";

  let options = null;
  if (props.options) {
    options = props.options.map((op, i) => {
      return (
        <option className={classes.option} key={i} value={op}>
          {op}
        </option>
      );
    });
  }

  return (
    <div className={classes.selectWrapper}>
      <select
        className={classes.select}
        onChange={props.changed}
        value={props.selected}
      >
        {options}
      </select>
      <span className={classes.customArrow} hide={hideArrow} />
    </div>
  );
};

export default Select;
