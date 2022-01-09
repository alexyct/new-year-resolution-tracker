import React, { useState, useEffect } from "react";
import classes from "./SetResolution.module.css";

import Select from "@/components/Select/Select";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

const SetResolution = (props) => {
  const unitOptions = ["hours", "minutes", "times"];
  const frequencyOptions = ["day", "week", "month"];

  const { units, quantity, frequency } = props.userData;

  return (
    <div>
      <div className={classes.resolution}>
        <h3 className={classes.resolutionText}>I will exercise for </h3>
        <div className={classes.inputWrapper}>
          <Input
            custom
            type="number"
            value={quantity}
            changed={props.frequencyChangedHandler}
          />
        </div>
        <div className={classes.selectWrapper}>
          <Select
            selected={units}
            options={unitOptions}
            changed={props.unitChangedHandler}
          />
        </div>
        <div className={classes.frequencyWrapper}>
          <h3 className={classes.resolutionText}>every</h3>
          <div className={classes.selectWrapper}>
            <Select
              options={frequencyOptions}
              changed={props.frequencyTypeChangedHandler}
              selected={frequency}
            />
          </div>
        </div>
      </div>
      <div className={classes.buttonWrapper}>
        <Button tertiary narrow clicked={props.buttonClickedHandler}>
          continue
        </Button>
      </div>
    </div>
  );
};

function getTextWidth(inputText) {
  let font = "16px times new roman";

  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  context.font = font;
  let width = context.measureText(inputText).width;
  let formattedWidth = Math.ceil(width);

  return formattedWidth;
}

export default SetResolution;
