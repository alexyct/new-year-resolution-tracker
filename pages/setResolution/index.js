import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

import SetResolution from "components/SetResolution/SetResolution";

const Index = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [resolutionData, setResolutionData] = useState({
    type: "exercise",
    units: "hours",
    quantity: 4,
    frequency: "week",
  });

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

  const setResolutionHandler = () => {
    axios
      .post(`/api/resolutions/${session.user.id}`, resolutionData)
      .then((response) => {
        console.log(response);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    // email APIs

    axios
      .post(
        `https://www.easycron.com/rest/add?token=2c1a12733fbeb2af6d56c01638cfa846&url=https://nyrtracker.vercel.app/api/mail/daily&cron_expression=0 21 * * *&timezone_from=2&timezone=America/Los_Angeles&http_method=POST&http_headers=Content-Type: application/json&http_message_body={"emailTo": ${session.user.email}}&cron_job_name=Daily (${session.user.email})
      `
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(
        `https://www.easycron.com/rest/add?token=2c1a12733fbeb2af6d56c01638cfa846&url=https://nyrtracker.vercel.app/api/mail/weekly/${session.user.id}&cron_expression=1 21 * * 0&timezone_from=2&timezone=America/Los_Angeles&http_method=POST&http_headers=Content-Type: application/json&http_message_body={"name": ${session.user.name}, "emailTo": ${session.user.email}&cron_job_name=Weekly (${session.user.email})`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <SetResolution
        resolutionData={resolutionData}
        resolutionChangedHandler={resolutionChangedHandler}
        setResolutionHandler={setResolutionHandler}
      />
    </div>
  );
};

export default Index;
