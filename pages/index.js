import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "@/store/axios";

import SetResolutionPrompt from "@/components/SetResolutionPrompt/SetResolutionPrompt";
import Dashboard from "@/components/Dashboard/";
import { getCurrWeek, weekToDate } from "@/lib/utils";

const Index = () => {
  const { data: session, status } = useSession();

  const [week, setWeek] = useState(getCurrWeek());
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLoading, setIsLoading] = useState("false");

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

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [windowWidth]);

  useEffect(() => {
    console.log("useEffect called");
    if (session && status !== "loading") {
      // post resolution
      // const data = { resolutionData };
      setIsLoading(true);
      console.log("is logged in");
      console.log(`/api/reports/${session.user.id}?week=${weekToDate(week)}`);
      axios
        .get(`/api/reports/${session.user.id}?week=${weekToDate(week)}`)
        // .get(`/api/logs/${session.user.id}?week=${weekToDate(week)}`)
        .then((response) => {
          setResolutionData(response.data.resolution);
          // should get: graph data,
          setDashboardData(response.data.table);
          // memo data
          setMemoData(response.data.report[0]);

          setInsightsData(response.data.insights);
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
        insightsData={insightsData}
        resolutionData={resolutionData}
        dashboardData={dashboardData}
        memoData={memoData}
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
