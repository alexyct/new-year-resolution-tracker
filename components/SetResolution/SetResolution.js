import React from "react";
import classes from "./SetResolution.module.css";

import Select from "@/components/Select/Select";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

const SetResolution = (props) => {
  const unitOptions = ["hours", "minutes"];
  const frequencyOptions = ["day", "week", "month"];
  const { units, quantity, frequency } = props.resolutionData;

  return (
    <>
      <div className={classes.resolution}>
        <h3 className={classes.resolutionText}>I will exercise for </h3>
        <div className={classes.inputWrapper}>
          <Input
            custom
            type="number"
            value={quantity}
            changed={(e) => {
              props.resolutionChangedHandler(e, "quantity");
            }}
          />
        </div>
        <div className={classes.selectWrapper}>
          <Select
            selected={units}
            options={unitOptions}
            changed={(e) => {
              props.resolutionChangedHandler(e, "units");
            }}
          />
        </div>
        <div className={classes.frequencyWrapper}>
          <h3 className={classes.resolutionText}>every</h3>
          <div className={classes.selectWrapper}>
            <Select
              options={frequencyOptions}
              changed={(e) => {
                props.resolutionChangedHandler(e, "frequency");
              }}
              selected={frequency}
            />
          </div>
        </div>
      </div>
      <div className={classes.buttonWrapper}>
        <Button
          color="black"
          tertiary
          narrow
          clicked={props.setResolutionHandler}
        >
          continue
        </Button>
      </div>
    </>
  );
};

export default SetResolution;
