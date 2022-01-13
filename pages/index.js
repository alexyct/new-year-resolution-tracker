import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import axios from '@/store/axios';

import SetResolutionPrompt from '@/components/SetResolutionPrompt/SetResolutionPrompt';
import Dashboard from '@/components/Dashboard/';
import { getCurrWeek, weekToDate } from '@/lib/utils';

const Index = () => {
  const { data: session, status } = useSession();

  const [week, setWeek] = useState(getCurrWeek());
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLoading, setIsLoading] = useState('false');

  const [resolutionData, setResolutionData] = useState({
    type: 'exercise',
    units: 'hours',
    quantity: 4,
    frequency: 'week',
  });

  const [dashboardData, setDashboardData] = useState([]);
  const [memoData, setMemoData] = useState([]);
  const [insightsData, setInsightsData] = useState([]);

  const resolutionChangedHandler = (e, key) => {
    if (key === 'units') {
      setResolutionData((prevState) => {
        return { ...prevState, units: e.target.value };
      });
    } else if (key === 'quantity') {
      setResolutionData((prevState) => {
        return { ...prevState, quantity: e.target.value };
      });
    } else if (key === 'frequency') {
      setResolutionData((prevState) => {
        return { ...prevState, frequency: e.target.value };
      });
    }
  };

  const signInClickedHandler = () => {
    signIn('google');
  };

  const signOutClickedHandler = () => {
    signOut('google');
  };

  const incrementWeek = (increment) => {
    if (week + increment > 0) {
      setWeek(week + increment);
    }
  };

  const resizeHandler = () => {
    const temp = document.getElementById('overview_wrap')
      ? document.getElementById('overview_wrap').clientWidth
      : 0;
    setTimeout(() => {
      setWindowWidth(temp);
    }, 200);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [windowWidth]);

  console.log(resolutionData);

  useEffect(() => {
    if (session && status !== 'loading') {
      // post resolution
      // const data = { resolutionData };
      setIsLoading(true);
      // email APIs

      // axios
      //   .post(
      //     `https://www.easycron.com/rest/add?token=2c1a12733fbeb2af6d56c01638cfa846&url=https://nyrtracker.vercel.app/api/mail/daily&cron_expression=0 21 * * *&timezone_from=2&timezone=America/Los_Angeles&http_method=POST&http_headers=Content-Type: application/json&http_message_body={"emailTo": ${session.user.email}}&cron_job_name=Daily (${session.user.email})
      // `
      //   )
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      // axios
      //   .post(
      //     `https://www.easycron.com/rest/add?token=2c1a12733fbeb2af6d56c01638cfa846&url=https://nyrtracker.vercel.app/api/mail/weekly/${session.user.id}&cron_expression=1 21 * * 0&timezone_from=2&timezone=America/Los_Angeles&http_method=POST&http_headers=Content-Type: application/json&http_message_body={"name": ${session.user.name}, "emailTo": ${session.user.email}&cron_job_name=Weekly (${session.user.email})`
      //   )
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      console.log(resolutionData);

      axios
        .get(`/api/reports/${session.user.id}?week=${weekToDate(week)}`)
        // .get(`/api/logs/${session.user.id}?week=${weekToDate(week)}`)
        .then((response) => {
          // setResolutionData()
          // should get: graph data,
          setDashboardData(response.data.table);
          // memo data
          setMemoData(response.data.report[0]);

          setInsightsData(response.data.insights);
          console.log(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setDashboardData([]);
          console.log(error);
        });
    } else {
      console.log('no session');
    }
  }, [session, status, week]);

  let renderedPage = null;
  if (session && status !== 'loading') {
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
    console.log('not logged in');
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
