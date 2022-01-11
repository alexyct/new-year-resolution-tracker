import ReactDOMServer from 'react-dom/server';
import nodemailer from 'nodemailer';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

function WeeklyMail({ name, summary, insights }) {
  return (
    <div>
      <p>Hi {name}! Here is a pretty visual to show your progress this week:</p>
      {/* {logs.map((log) => (
        <p key={log._id}>{log.type}</p>
      ))} */}
      <p>{summary}</p>
      <p>Some insights to help you better acheive your goals:</p>
      <ul>
        {insights.map((insight) => (
          <li key={insight.key}>{insight.content}</li>
        ))}
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

  // Get data from database
  const logs = await db
    .collection('logs')
    .find({
      userId: ObjectId(userId),
      startDateTime: {
        $gte: new Date(
          new Date().setHours(0, 0, 0, 0) - 6 * 60 * 60 * 24 * 1000
        ),
      },
    })
    .sort({ _id: -1 })
    .toArray();

  // Generate summary:
  const summary = 'this is a summary based on the logs';

  // Generate insights
  const insights = [
    { key: 1, content: 'you should exercise earlier' },
    { key: 2, content: 'you should exercise for 5 minutes every day' },
    { key: 3, content: 'you should exercise for 5 minutes every day' },
  ];

  // Save report to database
  const report = await db.collection('reports').insertOne({
    summary: summary,
    insights: insights,
    userId: ObjectId(userId),
    dateCreated: new Date(),
  });

  // Define email containing report

  let mailOptions = {
    from: 'newyearresolutiontracker@gmail.com',
    to: req.body.emailTo,
    subject: 'You weekly report is here!',
    text: 'Here is a summary of your progress this week.',
    html: await ReactDOMServer.renderToString(
      <WeeklyMail name={req.body.name} summary={summary} insights={insights} />
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
