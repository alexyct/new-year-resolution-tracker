import React, { useState } from "react";
import axios from "axios";
import { useSession, getSession } from "next-auth/react";
import classes from "./index.module.css";
import { useRouter } from "next/router";

import LogData from "@/components/LogData/LogData";

const convertDayFormat = (date) => {
  // week 1:
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();
  date = yyyy + "-" + mm + "-" + dd;
  return date;
};

const Index = () => {
  const router = useRouter();
  const { data: session } = useSession();
  // TODO: get date from history
  // let date = new Date();
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const [date, setDate] = useState(today);
  const [exercise, setExercise] = useState("Walking");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [errorMessage, setErrorMessage] = useState(null);

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

  const dateChangedHandler = (e) => {
    let tempDate = e.target.value.split("-");
    tempDate = new Date(tempDate[0], tempDate[1] - 1, tempDate[2]);
    tempDate.setHours(0, 0, 0, 0);
    setDate(tempDate);
  };

  const logButtonClickedHandler = () => {
    setErrorMessage(null);
    const diff =
      parseInt(endTime.split(":")[0]) +
      parseInt(endTime.split(":")[1]) / 60 -
      (parseInt(startTime.split(":")[0]) +
        parseInt(startTime.split(":")[1]) / 60);

    if (diff <= 0) {
      setErrorMessage("please enter valid time range");
      return;
    }

    // hour = 60 * 60 * 1000
    let start = date;
    start.setHours(
      parseInt(startTime.split(":")[0]),
      parseInt(startTime.split(":")[1]),
      0,
      0
    );
    start = start.toISOString();

    let end = date;
    end.setHours(
      parseInt(endTime.split(":")[0]),
      parseInt(endTime.split(":")[1]),
      0,
      0
    );
    end = end.toISOString();

    // validate end > start

    // console.log(start)

    // TODO: validate start < end
    const data = { type: exercise, startDateTime: start, endDateTime: end };
    console.log("sending this to /api/logs:");
    console.log(data);
    axios
      .post(`/api/logs/${session.user.id}`, data)
      .then((response) => {
        console.log(response);
        router.push("/logConfirmation");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <LogData
        date={convertDayFormat(date)}
        logData={logData}
        exerciseChangedHandler={exerciseChangedHandler}
        startTimeChangedHandler={startTimeChangedHandler}
        endTimeChangedHandler={endTimeChangedHandler}
        logButtonClickedHandler={logButtonClickedHandler}
        dateChangedHandler={dateChangedHandler}
      />
      <p className={classes.error}>{errorMessage}</p>
    </div>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
