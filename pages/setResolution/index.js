import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "@/store/axios";

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
