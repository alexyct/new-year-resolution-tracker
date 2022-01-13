import React, { useEffect, useState } from 'react';
import useGoogleCharts from 'store/useGoogleCharts';
import { useRouter } from 'next/router';
import classes from './index.module.css';

import Resolution from './Resolution/Resolution';
import LogResolutionButton from './LogResolutionButton/LogResolutionButton';
import Overview from './Overview/Overview';
import Insights from './Insights/Insights';
import WeekNav from './WeekNav/WeekNav';
import Reflection from './Overview/Reflection/Reflection';
import Button from 'components/Button/Button';

const Dashboard = (props) => {
  const router = useRouter();
  const google = useGoogleCharts();

  const logDataButtonClickedHandler = () => {
    router.push('/logData');
  };

  const editMemoClickedHandler = () => {
    router.push(`/addMemo/?week=${props.week}`);
  };

  return (
    <div className={classes.dashboard}>
      <div className={classes.resolutionWrapper}>
        <Resolution resolutionData={props.resolutionData} />
      </div>
      <LogResolutionButton clicked={logDataButtonClickedHandler} />

      <div className={classes.overviewWrapper}>
        <div className={classes.barGraphWrapper} id="overview_wrap">
          <Overview
            google={google}
            data={props.dashboardData}
            width={props.width}
          />
        </div>
        <div className={classes.insightsWrapper}>
          <Insights insights={props.insightsData} />
        </div>
      </div>
      <WeekNav week={props.week} clicked={props.incrementWeek} />
      <Reflection memoData={props.memoData} clicked={editMemoClickedHandler} />
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
