import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

import SetResolutionPrompt from "@/components/SetResolutionPrompt/SetResolutionPrompt";
import Dashboard from "@/components/Dashboard/";
import { getCurrWeek, weekToDate } from "@/lib/utils";
import sendDemoEmail from "./test.js";

const Index = () => {
  const { data: session, status } = useSession();

  const [week, setWeek] = useState(getCurrWeek());
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLoading, setIsLoading] = useState("false");

  const [averageData, setAverageData] = useState(0);
  const [resolutionData, setResolutionData] = useState({
    type: "exercise",
    units: "hours",
    quantity: 4,
    frequency: "week",
  });

  const [dashboardData, setDashboardData] = useState([]);
  const [memoData, setMemoData] = useState([]);
  const [insightsData, setInsightsData] = useState([]);

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

  const resizeHandler = () => {
    const temp = document.getElementById("overview_wrap")
      ? // ? document.getElementById('overview_wrap').clientWidth
        document.body.clientWidth
      : 0;
    setTimeout(() => {
      setWindowWidth(temp);
    }, 200);
  };

  const weeklyButtonClickedHandler = async () => {
    axios
      .post("/api/mail/demo", { emailTo: session.user.email })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const dailyButtonClickedHandler = async () => {
    axios
      .post("/api/mail/daily", { emailTo: session.user.email })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [windowWidth]);

  useEffect(() => {
    if (session && status !== "loading") {
      // post resolution
      // const data = { resolutionData };
      setIsLoading(true);
      axios
        .get(`/api/reports/${session.user.id}?week=${weekToDate(week)}`)
        .then((response) => {
          setResolutionData(response.data.resolution);
          // should get: graph data,
          setDashboardData(response.data.table);
          // memo data
          setMemoData(response.data.report[0]);

          setInsightsData(response.data.insights);

          setAverageData(response.data.average);
          setIsLoading(false);

          console.log(response);
        })
        .catch((error) => {
          setDashboardData([]);
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
        averageData={averageData}
        insightsData={insightsData}
        resolutionData={resolutionData}
        dashboardData={dashboardData}
        memoData={memoData}
        weeklyButtonClickedHandler={weeklyButtonClickedHandler}
        dailyButtonClickedHandler={dailyButtonClickedHandler}
        signOutClickedHandler={signOutClickedHandler}
        incrementWeek={incrementWeek}
        week={week}
        width={windowWidth}
      />
    );
  } else {
    console.log("not logged in");
    renderedPage = (
      <SetResolutionPrompt
        resolutionData={resolutionData}
        buttonClickedHandler={signInClickedHandler}
      />
    );
  }

  return <div>{renderedPage}</div>;
};

export default Index;
