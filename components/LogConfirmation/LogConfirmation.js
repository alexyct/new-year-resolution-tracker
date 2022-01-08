import React from "react";
import classes from "./LogConfirmation.module.css";

import Button from "@/components/Button/Button";

const LogConfirmation = () => {
  return (
    <div className={classes.logConfirmation}>
      <div className={classes.titleWrapper}>
        <h1 className={classes.title}>Your data is logged &#128588;</h1>
        <h1 className={classes.title}>Keep up the good work!</h1>
      </div>

      <div className={classes.buttonWrapper}>
        <Button tertiary narrow>
          back
        </Button>
      </div>
    </div>
  );
};

export default LogConfirmation;
