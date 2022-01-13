import React, { useEffect, useState } from "react";
import useGoogleCharts from "store/useGoogleCharts";
import { useRouter } from "next/router";
import classes from "./index.module.css";

import Resolution from "./Resolution/Resolution";
import LogResolutionButton from "./LogResolutionButton/LogResolutionButton";
import Overview from "./Overview/Overview";
import Insights from "./Insights/Insights";
import WeekNav from "./WeekNav/WeekNav";
import Reflection from "./Overview/Reflection/Reflection";
import Button from "components/Button/Button";

const Dashboard = (props) => {
  const router = useRouter();
  const google = useGoogleCharts();

  const logDataButtonClickedHandler = () => {
    router.push("/logData");
  };

  const editMemoClickedHandler = () => {
    router.push(`/addMemo/?week=${props.week}`);
  };

  return (
    <div className={classes.dashboard}>
      <div className={classes.HeadWrapper}>
        <div>
          <Resolution resolutionData={props.resolutionData} />
        </div>
        <div className={classes.weekNavWrapper}>
          <WeekNav week={props.week} clicked={props.incrementWeek} />
        </div>
      </div>
      <div className={classes.mainWrapper}>
        <div className={classes.overviewWrapper}>
          <div className={classes.subHeadingWrapper}>
            <h2 className={classes.subHeading}>Stats</h2>
            <LogResolutionButton clicked={logDataButtonClickedHandler} />
          </div>
          <div className={classes.overview} id="overview_wrap">
            <Overview
              google={google}
              data={props.dashboardData}
              width={props.width}
            />
          </div>
        </div>
        <div className={classes.insightsWrapper}>
          <h2 className={classes.subHeading}>Insights</h2>
          <div className={classes.insights}>
            <Insights insights={props.insightsData} />
          </div>
        </div>
      </div>
      <div>
        <div className={classes.subHeadingWrapper}>
          <h2 className={classes.subHeading}>Your Memo</h2>
          <a
            className={classes.editMemoButton}
            onClick={editMemoClickedHandler}
          >
            Edit Memo
          </a>
        </div>
        <Reflection
          memoData={props.memoData}
          clicked={editMemoClickedHandler}
        />
      </div>

      <div className={classes.signoutButtonWrapper}>
        <Button
          color="green"
          tertiary
          narrow
          clicked={props.signOutClickedHandler}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
