import React from 'react';
import classes from './LogResolutionButton.module.css';

const LogResolutionButton = (props) => {
  return (
    <div>
      <a className={classes.button} onClick={props.clicked}>
        Add Data
      </a>
    </div>
  );
};

export default LogResolutionButton;
