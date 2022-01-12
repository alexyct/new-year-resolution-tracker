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

export function weekToDate(week) {
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
}

const Index = () => {
  const { data: session, status } = useSession();

  const [week, setWeek] = useState(getCurrWeek());
  const [windowWidth, setWindowWidth] = useState(0);

  const [isLoading, setIsLoading] = useState("false");

  const [resolutionData, setResolutionData] = useState({
    type: "exercise",
    units: "hours",
    quantity: 2,
    frequency: "week",
  });

  const [dashboardData, setDashboardData] = useState([]);
  const [memoData, setMemoData] = useState([]);
  const [insightsData, setInsightsData] = useState([]);

  const resolutionChangedHandler = (e, key) => {
    if (key === "units") {
      setResolutionData((prevState) => {
        return { ...prevState, units: e.target.value };
      });
    } else if (key === "quantity") {
      setResolutionData((prevState) => {
        return { ...prevState, quantity: e.target.value };
      });
    } else if (key === "frequency") {
      setResolutionData((prevState) => {
        return { ...prevState, frequency: e.target.value };
      });
    }
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

  const resizeHandler = () => {
    const temp = document.getElementById("overview_wrap")
      ? document.getElementById("overview_wrap").clientWidth
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
    if (session && status !== "loading") {
      // post resolution
      // const data = { resolutionData };
      setIsLoading(true);
      axios
        .post(`/api/resolutions/${session.user.id}`, resolutionData)
        .then((response) => {
          // is this resolution?
          // setResolutionData(response.data)
          // get dashboard info
          console.log(
            `/api/reports/${session.user.id}?week=${weekToDate(week)}`
          );
          axios
            .get(`/api/reports/${session.user.id}?week=${weekToDate(week)}`)
            // .get(`/api/logs/${session.user.id}?week=${weekToDate(week)}`)
            .then((response) => {
              // should get: graph data,
              setDashboardData(response.data.table);
              // memo data
              setMemoData(response.data.report);

              setInsightsData(response.data.insights);
              console.log(response);
              setIsLoading(false);
            })
            .catch((error) => {
              setDashboardData([]);
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
      <SetResolution
        resolutionData={resolutionData}
        resolutionChangedHandler={resolutionChangedHandler}
        buttonClickedHandler={signInClickedHandler}
      />
    );
  }

  return <div>{renderedPage}</div>;
};

export default Index;
