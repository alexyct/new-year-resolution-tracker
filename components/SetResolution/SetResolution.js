import React, { useState, useEffect } from "react";
import classes from "./SetResolution.module.css";

import Select from "@/components/Select/Select";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

const SetResolution = (props) => {
  const unitOptions = ["hours", "minutes"];
  const frequencyOptions = ["day", "week", "month"];

  const [viewedPrompt, setViewedPrompt] = useState(false);

  const { units, quantity, frequency } = props.resolutionData;

  const setResolutionClickedHandler = () => {
    setViewedPrompt(true);
  };

  let page = null;
  if (!viewedPrompt) {
    page = (
      <div className={classes.promptBackdrop}>
        <div className={classes.prompt}>
          <h1>What&apos;s your new year resolution?</h1>
          <p>Log your daily exercise and we will keep track of your progress</p>
          <div className={classes.buttonWrapper}>
            <Button
              color="white"
              secondary
              narrow
              clicked={setResolutionClickedHandler}
            >
              SET RESOLUTION &#10132;
            </Button>
          </div>
          <div className={classes.signInPrompt}>
            <div className={classes.signInButton}>
              or
              <Button
                color="white"
                tertiary
                narrow
                clicked={props.buttonClickedHandler}
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    page = (
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
            clicked={props.buttonClickedHandler}
          >
            continue
          </Button>
        </div>
      </>
    );
  }

  return <div className={classes.setResolution}>{page}</div>;
};

// function getTextWidth(inputText) {
//   let font = "16px times new roman";

//   let canvas = document.createElement("canvas");
//   let context = canvas.getContext("2d");
//   context.font = font;
//   let width = context.measureText(inputText).width;
//   let formattedWidth = Math.ceil(width);

//   return formattedWidth;
// }

export default SetResolution;
