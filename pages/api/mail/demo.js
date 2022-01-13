import ReactDOMServer from 'react-dom/server';
import nodemailer from 'nodemailer';
import EmailGraph from 'store/emailGraph';

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

const test = {
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      { label: 'Users', data: [50, 60, 70, 180] },
      { label: 'Revenue', data: [100, 200, 300, 400] },
    ],
  },
};

function DemoMail() {
  return (
    <div>
      <p>Hi NAME! Here is a pretty visual to show your progress this week:</p>
      <EmailGraph />
      <img
        width="600"
        height="800"
        style={{ display: 'block' }}
        src={`https://quickchart.io/chart?c=${JSON.stringify(demoChartData)}`}
        alt={`https://quickchart.io/chart?c=${JSON.stringify(demoChartData)}`}
        title="Demo Chart"
      />
      <div
        style={{
          height: '24px',
          width: '24px',
          display: 'block',
          background: `url(
            https://quickchart.io/chart?c=${JSON.stringify(demoChartData)}
          )`,
          backgroundSize: 'contain',
        }}
      ></div>
      {/* <img src={`https://quickchart.io/chart?c=${JSON.stringify(test)}`} /> */}
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({
      error: 'Method Not Allowed',
    });
  }

  let mailOptions = {
    from: 'newyearresolutiontracker@gmail.com',
    to: req.body.emailTo,
    subject: '[DEMO] New year resolution tracker - your weekly report is here!',
    text: 'Here is a summary of your progress this week. Here are some insights on how you can better acheive your goals. Click here to add a memo/reflection on your progress this week.',
    // html: '<div><p>Here is a summary of your progress this week</p><p>Here are some insights on how you can better acheive your goals.</p><p>Click <a href="https://nyrtracker.vercel.app">here</a> to add a memo/reflection on your progress this week.</p></div>',
    html: await ReactDOMServer.renderToString(<DemoMail />),
  };

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return res.status(200).json({ sent: 'ok' });
  } catch (error) {
    console.error(`Failed to send email: `, error);
    return res.status(400).send({
      error: 'Could not send the email',
    });
  }
}
