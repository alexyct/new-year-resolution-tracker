import React, { useState } from "react";
import axios from "@/store/axios";
import { useSession } from "next-auth/react";

import LogData from "@/components/LogData/LogData";

const Index = () => {
  const session = useSession();
  // TODO: get date from history
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  const [exercise, setExercise] = useState("workout");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");

  const logData = {
    type: exercise,
    startTime: startTime,
    endTime: endTime,
  };

  const exerciseChangedHandler = (e) => {
    setExercise(e.target.value);
  };

  const startTimeChangedHandler = (e) => {
    setStartTime(e.target.value);
  };

  const endTimeChangedHandler = (e) => {
    setEndTime(e.target.value);
  };

  const logButtonClickedHandler = () => {
    // hour = 60 * 60 * 1000
    let start = date;
    start.setHours(startTime.split(":")[0], startTime.split(":")[1], 0, 0);
    start = start.toISOString();
    let end = date;
    end.setHours(endTime.split(":")[0], endTime.split(":")[1], 0, 0);
    end = end.toISOString();

    // TODO: validate start < end
    const data = { type: exercise, startDateTime: start, endDateTime: end };
    axios
      .post(`/api/logs${session.user.id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <LogData
        date={date}
        logData={logData}
        exerciseChangedHandler={exerciseChangedHandler}
        startTimeChangedHandler={startTimeChangedHandler}
        endTimeChangedHandler={endTimeChangedHandler}
        logButtonClickedHandler={logButtonClickedHandler}
      />
    </div>
  );
};

export default Index;
