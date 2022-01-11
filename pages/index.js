import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "@/store/axios";

import SetResolution from "@/components/SetResolution/SetResolution";
import Dashboard from "@/components/Dashboard/";

export function getCurrWeek() {
  return (
    Math.floor((new Date().getDate() - new Date(2022, 0, 3).getDate()) / 7) + 1
  );
}

const Index = () => {
  const { data: session, status } = useSession();

  const [unit, setUnit] = useState("hours");
  const [frequency, setFrequency] = useState(2);
  const [frequencyType, setFrequencyType] = useState("week");
  const [week, setWeek] = useState(getCurrWeek());

  const [isLoading, setIsLoading] = useState("false");

  const resolutionData = {
    type: "exercise",
    units: unit,
    quantity: frequency,
    frequency: frequencyType,
  };

  const [dashboardData, setDashboardData] = useState({});
  const [memoData, setMemoData] = useState({});

  const unitChangedHandler = (e) => {
    // TODO: bound number
    setUnit(e.target.value);
  };

  const frequencyChangedHandler = (e) => {
    setFrequency(e.target.value);
  };

  const frequencyTypeChangedHandler = (e) => {
    setFrequencyType(e.target.value);
  };

  const signInClickedHandler = () => {
    signIn("google");
  };

  const signOutClickedHandler = () => {
    signOut("google");
  };

  const incrementWeek = (increment) => {
    if (week + increment > 0) {
      setWeek(week + increment);
    }
  };

  const weekToDate = (week) => {
    // week 1:
    let out = new Date(2022, 0, 3);
    if (week > 1) {
      out.setDate(out.getDate() + (week - 1) * 7);
    }
    var dd = String(out.getDate()).padStart(2, "0");
    var mm = String(out.getMonth() + 1).padStart(2, "0");
    var yyyy = out.getFullYear();
    out = yyyy + "-" + mm + "-" + dd;
    return out;
  };

  console.log(weekToDate(week));

  useEffect(() => {
    if (session && status !== "loading") {
      // post resolution
      // const data = { resolutionData };
      setIsLoading(true);
      axios
        .post(`/api/resolutions/${session.user.id}`, resolutionData)
        .then((response) => {
          console.log(response);
          // get dashboard info
          axios
            // .get(`/api/reports/${session.user.id}?type=latest`)
            .get(`/api/logs/${session.user.id}?week=${weekToDate(week)}`)
            .then((response) => {
              // should get: graph data,
              setDashboardData(null);
              // memo data
              setMemoData(null);
              console.log(response);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("no session");
    }
  }, [session, status, week]);

  let renderedPage = null;
  if (session && status !== "loading") {
    renderedPage = (
      <Dashboard
        dashboardData={dashboardData}
        memoData={memoData}
        signOutClickedHandler={signOutClickedHandler}
        incrementWeek={incrementWeek}
        week={week}
      />
    );
  } else {
    console.log("not logged in");
    renderedPage = (
      <SetResolution
        resolutionData={resolutionData}
        unitChangedHandler={unitChangedHandler}
        frequencyChangedHandler={frequencyChangedHandler}
        frequencyTypeChangedHandler={frequencyTypeChangedHandler}
        buttonClickedHandler={signInClickedHandler}
      />
    );
  }

  return <div>{renderedPage}</div>;
};

export default Index;
