import { useSession, signIn, signOut } from 'next-auth/react';

import EmailGraph from '@/store/emailGraph';

const demoChartData = {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        type: 'line',
        label: 'Average',
        yAxisID: 'y2',
        data: [1, 1, 1, 1, 1, 1, 1],
        borderColor: 'rgb(128,128,128)',
        fill: false,
        pointRadius: 0,
      },
      {
        type: 'line',
        label: 'Target',
        yAxisID: 'y2',
        data: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
        borderColor: 'rgb(255,0,0)',
        fill: false,
        pointRadius: 0,
      },
      {
        label: 'Running',
        yAxisID: 'y1',
        backgroundColor: 'rgb(99, 202, 110)',
        data: [0.5, 0.6, 2, 2, 0, 0, 1, 5],
      },
      {
        label: 'Swimming',
        yAxisID: 'y1',
        backgroundColor: 'rgb(60, 185, 238)',
        data: [0, 2, 1, 1.2, 1.2, 2.4, 0],
      },
    ],
  },
  options: {
    legend: {
      display: true,
      position: 'bottom',
      align: 'middle',
      padding: 20,
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          display: false,
        },
      ],
      yAxes: [
        {
          id: 'y1',
          display: true,
          position: 'left',
          stacked: true,
          ticks: {
            min: 0,
            max: 4,
            stepSize: 1,
          },
        },
        {
          id: 'y2',
          display: false,
          position: 'right',
          ticks: {
            min: 0,
            max: 4,
            stepSize: 1,
          },
        },
      ],
    },
  },
};

function DemoMail() {
  return (
    <div>
      <p>Hi NAME! Here is a pretty visual to show your progress this week:</p>
      <EmailGraph />
      <img
        src={`https://quickchart.io/chart?c=${JSON.stringify(demoChartData)}`}
      />
      <p>
        Total hours. Comparison with last week. Chart of exercise every day,
        with current average and target average plotted. Percentage break down
        of exercise type. How are you doing in relation to your resolution.
      </p>
      <p>Some insights to help you better acheive your goals:</p>
      <ul>
        <li>
          We noticed that on some days you do not exercise at all. Try to still
          exercise for 5 minutes on these days so you build up a routine, which
          makes it easier for you to not skip days when you actually have time.
        </li>
        <li>
          You exercise quite late in the evenings. Although exercising is great,
          physical acticitivies close to bedtime can make it difficult to fall
          asleep by disrupting your heartrate.
        </li>
        <li>
          Get an accountability partner (e.g. friend, family, colleague) to help
          you stay on track. Studies show that you have are 33% more likely to
          complete a goal if you commit to someone.
        </li>
      </ul>
      <p>
        Click <a href="https://nyrtracker.vercel.app">here</a> to write a memo
        on your progress this week. Journaling is a great way to improve your
        chances of suceeding at your new year resolutions.
      </p>
      <p>That&apos;s it - keep up the good work and see you next week!</p>
    </div>
  );
}

export default function TestPage() {
  const { data: session } = useSession();

  const sendWeeklyEmail = async () => {
    try {
      const res = await fetch(`/api/mail/weekly/${session.user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: session.user.name,
          emailTo: session.user.email,
        }),
      });
    } catch (e) {
      console.log(e);
    } finally {
      return;
    }
  };

  const sendDemoEmail = async () => {
    try {
      const res = await fetch(`/api/mail/demo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailTo: session.user.email,
        }),
      });
    } catch (e) {
      console.log(e);
    } finally {
      return;
    }
  };

  const sendDailyEmail = async () => {
    try {
      const res = await fetch(`/api/mail/daily`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailTo: session.user.email,
        }),
      });
    } catch (e) {
      console.log(e);
    } finally {
      return;
    }
  };

  if (session) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
        <p>
          For judges of the hackathon: we know you probably don&apos;t have a
          week to wait for our weekly automations to send, so click this button
          to see a demo of our weekly automated email. It takes in all the logs
          you have made and show you a summary of your progress this week,
          generate insights to help you better acheive your resolution, and
          prompt you to write a memo to reflect on your progress and keep up the
          good work.
        </p>
        <button onClick={() => sendDemoEmail()}>
          Send Demo of Automated Weekly Report
        </button>
        <p>
          We also have automated daily emails at 9pm to remind you to log data.
          Click this button get an email now;
        </p>
        <button onClick={() => sendDailyEmail()}>
          Send Reminder Email Now
        </button>
        <p>
          If you actually bothered to use the app and logged your data for a few
          days, you can get your sunday weekly report now with this button:
        </p>
        <button onClick={() => sendWeeklyEmail()}>
          Send Weekly Report Now
        </button>
        <EmailGraph />
        <DemoMail />
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('google')}>Sign in</button>
    </>
  );
}
