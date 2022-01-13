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
              lastWeek={props.averageData}
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

      <div className={classes.note}>
        <h2 className={classes.subHeading}>Note for Hackathon Judges</h2>
        <div className={classes.noteWrapper}>
          <p>
            For judges of the hackathon: we know you probably don't have a week
            to wait for our weekly automations to send, so click this button to
            see a demo of our weekly automated email. It takes in all the logs
            you have made and show you a summary of your progress this week,
            generate insights to help you better acheive your resolution, and
            prompt you to write a memo to reflect on your progress and keep up
            the good work.
          </p>
        </div>
      </div>

      <div className={classes.emailButtons}>
        <Button
          color="green"
          size="large"
          clicked={props.weeklyButtonClickedHandler}
        >
          Send Demo Weekly Report Email
        </Button>
        <Button
          color="green"
          size="large"
          clicked={props.dailyButtonClickedHandler}
        >
          Send Daily Reminder Email Now
        </Button>
      </div>

      <div className={classes.signoutButtonWrapper}>
        <Button color="red" primary clicked={props.signOutClickedHandler}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
