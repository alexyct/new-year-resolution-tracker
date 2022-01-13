import React from 'react';
import classes from './WeekNav.module.css';

import Button from 'components/Button/Button';
import { getCurrWeek } from '@/lib/utils';

const WeekNav = (props) => {
  let prevButton = (
    <div className={classes.buttonWrapper}>
      <Button
        color="green"
        clicked={() => {
          props.clicked(-1);
        }}
      >
        &#8592; Week {props.week - 1}
      </Button>
    </div>
  );
  let nextButton = (
    <div className={classes.buttonWrapper}>
      <Button
        color="green"
        clicked={() => {
          props.clicked(1);
        }}
      >
        Week {props.week + 1} &#8594;
      </Button>
    </div>
  );
  if (props.week === 1) {
    prevButton = <div className={classes.buttonWrapper}></div>;
  }
  if (props.week == getCurrWeek()) {
    nextButton = (
      <div className={classes.buttonWrapper}>
        <Button color="grey" disabled>
          Week {props.week + 1} &#8594;
        </Button>
      </div>
    );
  }
  return (
    <div className={classes.navButtons}>
      {prevButton}
      {nextButton}
    </div>
  );
};

export default WeekNav;
