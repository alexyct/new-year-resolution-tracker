import React from 'react';
import classes from './Resolution.module.css';

const Resolution = (props) => {
  let { quantity, unit, frequency } = { props };
  quantity = 2;
  unit = 'times';
  frequency = 'week';
  return (
    <div className={classes.resolutionBackdrop}>
      <div className={classes.resolution}>
        <h1>Your 2022 Resolution</h1>
        <h3>
          &quot;I will exercise {quantity} {unit} every {frequency}&quot;
        </h3>
      </div>
    </div>
  );
};

export default Resolution;
