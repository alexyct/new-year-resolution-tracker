import React from 'react';
import classes from './AddMemo.module.css';
import { useRouter } from 'next/router';

import Button from 'components/Button/Button';
import { getCurrWeek } from '@/lib/utils';

const AddMemo = (props) => {
  const router = useRouter();
  let { memo, week, saveMemoClickedHandler, memoChangedHandler } = { ...props };

  let start = new Date(2022, 0, 3);
  let end = new Date(2022, 0, 3);
  if (week > 1) {
    start.setDate(start.getDate() + (week - 1) * 7);
    end.setDate(end.getDate() + (week - 1) * 7 + 6);
  }
  if (week > getCurrWeek()) {
    router.push(`/addMemo?week=${getCurrWeek()}`);
  }
  start =
    String(start.getDate()).padStart(2, '0') +
    '/' +
    String(start.getMonth() + 1).padStart(2, '0');
  end =
    String(end.getDate()).padStart(2, '0') +
    '/' +
    String(end.getMonth() + 1).padStart(2, '0');

  return (
    <div className={classes.memoBackdrop}>
      <div className={classes.backButton}>
        <Button
          clicked={() => {
            router.push('/');
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
        <h3>
          {start} - {end}
        </h3>
        <ul className={classes.prompts}>
          <li>How are you feeling this week?</li>
          <li>
            Did you try anything new this week that worked very well for you?
          </li>
          <li>What will you do next week to make sure you stay on track?</li>
        </ul>
        <textarea
          className={classes.textarea}
          autoFocus={true}
          value={memo}
          onChange={memoChangedHandler}
        ></textarea>
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
