import ReactDOMServer from 'react-dom/server';
import nodemailer from 'nodemailer';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import {
  setToMonday,
  getTarget,
  getAverage,
  generateInsights,
} from '@/lib/utils';

function convertTime(num) {
  let hours = Math.floor(num);
  let minutes = Math.floor((num % 1) * 60);
  return hours + 'h ' + minutes + 'min';
}

function WeeklyMail({ name, averaged, exceeded, improved, insights }) {
  return (
    <div>
      <p>Hi {name} - You did great this week! You:</p>
      <ul>
        <li>Exercised for {averaged} this week.</li>
        <li>Exceed your goal by {exceeded}.</li>
        <li>Did {improved} more exercise than last week.</li>
      </ul>
      <p>Some insights to help you better acheive your goals:</p>
      <ul>
        {insights.map((insight, i) => {
          return <li key={i}>{insight}</li>;
        })}
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

  const client = await clientPromise;
  const db = client.db('tracker');
  const { userId } = req.query;
  const week = setToMonday(new Date());
  const endDate = setToMonday(new Date());
  const prevWeek = setToMonday(new Date());
  new Date(endDate.setDate(endDate.getDate() + 7));
  new Date(prevWeek.setDate(prevWeek.getDate() - 7));

  const resolution = await db.collection('resolutions').findOne({
    userId: ObjectId(userId),
  });

  const logs = await db
    .collection('logs')
    .find({
      userId: ObjectId(userId),
      startDateTime: {
        $gt: week,
      },
      endDateTime: {
        $lte: endDate,
      },
    })
    .sort({ startDateTime: -1 })
    .toArray();

  const prevLogs = await db
    .collection('logs')
    .find({
      userId: ObjectId(userId),
      startDateTime: {
        $gt: prevWeek,
      },
      endDateTime: {
        $lte: week,
      },
    })
    .sort({ startDateTime: -1 })
    .toArray();

  const average = getAverage(logs);
  const averaged = convertTime(average);
  const exceeded = convertTime(average - getTarget(resolution) / 7);
  const improved = convertTime(average - getAverage(prevLogs));

  const insights = generateInsights(logs);

  // Define email containing report
  let mailOptions = {
    from: 'newyearresolutiontracker@gmail.com',
    to: req.body.emailTo,
    subject: 'You weekly report is here!',
    text: 'Here is a summary of your progress this week.',
    html: await ReactDOMServer.renderToString(
      <WeeklyMail
        name={req.body.name}
        averaged={averaged}
        exceeded={exceeded}
        improved={improved}
        insights={insights}
      />
    ),
  };
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return res.status(200).json({ sent: logs });
  } catch (error) {
    console.error(`Failed to send email: `, error);
    return res.status(400).send({
      error: 'Could not send the email',
    });
  }
}
