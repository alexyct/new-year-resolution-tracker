import React from 'react';
import classes from './Reflection.module.css';

import Button from '@/components/Button/Button';

const Reflection = (props) => {
  const memo =
    props.memoData && props.memoData.length !== 0
      ? props.memoData.memo
      : 'Write some reflections for this week!';
  return (
    <div className={classes.reflection}>
      <p className={classes.memo}>{memo}</p>
      {/* <div className={classes.buttonWrapper}>
        <Button narrow color="green" clicked={props.clicked}>
          Edit Memo
        </Button>
      </div> */}
    </div>
  );
};

export default Reflection;
