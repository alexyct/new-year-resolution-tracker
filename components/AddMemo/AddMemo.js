import React from "react";
import classes from "./AddMemo.module.css";
import { useRouter } from "next/router";

import Button from "components/Button/Button";

const AddMemo = (props) => {
  const router = useRouter();
  let { week, startDate, endDate, saveMemoClickedHandler } = { props };
  week = 3;
  return (
    <div className={classes.memoBackdrop}>
      <div className={classes.backButton}>
        <Button
          clicked={() => {
            router.push("/");
          }}
          color="white"
          narrow
          tertiary
        >
          &#9664;
        </Button>
      </div>
      <div className={classes.addMemo}>
        <h1>Memo for Week {week}</h1>
        <h3>11th Jan - 18th Jan</h3>
        <ul className={classes.prompts}>
          <li>How are you feeling this week?</li>
          <li>
            Did you try anything new this week that worked very well for you?
          </li>
          <li>What will you do next week to make sure you stay on track?</li>
        </ul>
        <textarea className={classes.textarea} autoFocus={true}></textarea>
        <div className={classes.buttonWrapper}>
          <Button
            color="white"
            tertiary
            narrow
            clicked={saveMemoClickedHandler}
          >
            save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMemo;
