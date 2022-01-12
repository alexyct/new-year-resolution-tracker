import React, { useEffect, useState } from "react";
import useGoogleCharts from "store/useGoogleCharts";
import { useRouter } from "next/router";
import classes from "./index.module.css";

import Resolution from "./Resolution/Resolution";
import LogResolutionButton from "./LogResolutionButton/LogResolutionButton";
import Overview from "./Overview/Overview";
import WeekNav from "./WeekNav/WeekNav";
import Reflection from "./Overview/Reflection/Reflection";
import Button from "components/Button/Button";

const Dashboard = (props) => {
  const router = useRouter();
  const google = useGoogleCharts();
  const data = [
    ["Day", "Target", "Average", "Basketball", "Workout"],
    ["M", 1.6, 2.43, 3, 2],
    ["T", 1.6, 2.43, 1, 0],
    ["W", 1.6, 2.43, 1, 0.2],
    ["T", 1.6, 2.43, 1, 0.33],
    ["F", 1.6, 2.43, 2, 0.45],
    ["S", 1.6, 2.43, 2, 0.1],
    ["S", 1.6, 2.43, 3, 3],
  ];

  const logDataButtonClickedHandler = () => {
    router.push("/logData");
  };

  const editMemoClickedHandler = () => {
    router.push("/addMemo");
  };

  useEffect(() => {
    console.log("rendered");
  }, []);

  return (
    <div className={classes.dashboard}>
      <div className={classes.resolutionWrapper}>
        <Resolution />
      </div>
      <LogResolutionButton clicked={logDataButtonClickedHandler} />
      <div className={classes.barGraphWrapper} id="overview_wrap">
        <Overview google={google} data={data} width={props.width} />
      </div>
      <WeekNav week={props.week} clicked={props.incrementWeek} />
      <Reflection memo={null} clicked={editMemoClickedHandler} />
      <div className={classes.signoutButtonWrapper}>
        <Button
          color="black"
          tertiary
          narrow
          clicked={props.signOutClickedHandler}
        >
          sign out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
