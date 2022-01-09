import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import SetResolution from "@/components/SetResolution/SetResolution";

const index = () => {
  const { data: session } = useSession();

  const [unit, setUnit] = useState("hours");
  const [frequency, setFrequency] = useState(2);
  const [frequencyType, setFrequencyType] = useState("week");

  const userData = {
    type: "exercise",
    units: unit,
    quantity: frequency,
    frequency: frequencyType,
  };

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

  const buttonClickedHandler = () => {
    signIn("google");
  };

  let page = null;
  if (session) {
    page = <button onClick={() => signOut()}>Signout</button>;
  } else {
    page = (
      <SetResolution
        userData={userData}
        unitChangedHandler={unitChangedHandler}
        frequencyChangedHandler={frequencyChangedHandler}
        frequencyTypeChangedHandler={frequencyTypeChangedHandler}
        buttonClickedHandler={buttonClickedHandler}
      />
    );
  }

  return <div>{page}</div>;
};

export default index;
