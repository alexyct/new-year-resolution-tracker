import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import AddMemo from "components/AddMemo/AddMemo";
import axios from "axios";
import { weekToDate } from "pages";

const Index = () => {
  const router = useRouter();
  const [memo, setMemo] = useState("");
  const { data: session, status } = useSession();

  const memoChangedHandler = (e) => {
    setMemo(e.target.value);
  };

  const saveMemoClickedHandler = () => {
    axios
      .patch(`/api/reports/${session.user.id}?week=${weekToDate(week)}`, {
        memo: { memo },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const week = router.query.week;

  useEffect(() => {
    if (session && status !== "loading") {
      // post resolution
      // const data = { resolutionData };
      axios
        .get(`/api/reports/${session.user.id}?week=${weekToDate(week)}`)
        // .get(`/api/logs/${session.user.id}?week=${weekToDate(week)}`)
        .then((response) => {
          // should get: graph data,
          // memo data
          if (response.data.report.length > 0) {
            setMemo(response.data.report.memo);
          } else {
            setMemo("");
          }

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("no session");
    }
  }, [session, status]);

  return (
    <div>
      <AddMemo
        memo={memo}
        week={week}
        saveMemoClickedHandler={saveMemoClickedHandler}
        memoChangedHandler={memoChangedHandler}
      />
    </div>
  );
};

export default Index;
