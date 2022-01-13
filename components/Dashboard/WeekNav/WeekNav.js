import React from 'react';
import classes from './WeekNav.module.css';

import Button from 'components/Button/Button';
import { getCurrWeek } from '@/lib/utils';

function getDateFromWeek(weekNumber) {
  let date = new Date('2022-12-27T00:00:00.000+00:00');
  date.setDate(date.getDate() + weekNumber * 7);
  const startDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  date.setDate(date.getDate() + 7);
  const endDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return [startDate, endDate];
  // return date.toISOString().substring(0, 10);
}

const WeekNav = (props) => {
  let prevButton = (
    <div className={classes.buttonWrapper}>
      {/* <Button
        color="green"
        clicked={() => {
          props.clicked(-1);
        }}
      >
        &#8592;
      </Button> */}
      <a
        onClick={() => {
          props.clicked(-1);
        }}
        className={classes.arrow}
      >
        &#8592;
      </a>
    </div>
  );
  let nextButton = (
    <div className={classes.buttonWrapper}>
      {/* <Button
        color="green"
        clicked={() => {
          props.clicked(1);
        }}
      >
        &#8594;
      </Button> */}
      <a
        onClick={() => {
          props.clicked(1);
        }}
        className={classes.arrow}
      >
        &#8594;
      </a>
    </div>
  );
  if (props.week === 1) {
    prevButton = (
      <div className={classes.buttonWrapper}>
        <a className={classes.arrowDisabled}>&#8592;</a>
      </div>
    );
  }
  if (props.week == getCurrWeek()) {
    nextButton = (
      <div className={classes.buttonWrapper}>
        {/* <Button color="grey" disabled>
          &#8594;
        </Button> */}
        <a className={classes.arrowDisabled}>&#8594;</a>
      </div>
    );
  }
  return (
    <div className={classes.navButtons}>
      {prevButton}
      <p>
        {`${getDateFromWeek(props.week)[0]} - ${
          getDateFromWeek(props.week)[1]
        }`}
      </p>
      {nextButton}
    </div>
  );
};

export default WeekNav;
