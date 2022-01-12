import React from "react";
import classes from "./LogConfirmation.module.css";

import Button from "@/components/Button/Button";
import { useRouter } from "next/router";

const LogConfirmation = () => {
  const router = useRouter();
  return (
    <div className={classes.logConfirmation}>
      <div className={classes.titleWrapper}>
        <h1 className={classes.title}>Your data is logged &#128588;</h1>
        <h1 className={classes.title}>Keep up the good work!</h1>
      </div>

      <div className={classes.buttonWrapper}>
        <Button
          tertiary
          narrow
          color="white"
          clicked={() => {
            router.push("/");
          }}
        >
          back
        </Button>
      </div>
      <p>------or------</p>
      <div className={classes.buttonWrapper}>
        <Button
          tertiary
          narrow
          color="white"
          clicked={() => {
            router.push("/logData");
          }}
        >
          log another exercise
        </Button>
      </div>
    </div>
  );
};

export default LogConfirmation;
