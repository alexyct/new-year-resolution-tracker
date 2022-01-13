import React from 'react';
import classes from './Resolution.module.css';

const Resolution = (props) => {
  let { quantity, units, frequency } = { ...props.resolutionData };
  return (
    <div>
      <div className={classes.resolution}>
        <h1>Your 2022 Resolution</h1>
        <h3>
          &quot;I will exercise for {quantity} {units} every {frequency}&quot;
        </h3>
      </div>
    </div>
  );
};

export default Resolution;
