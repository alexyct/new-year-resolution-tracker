import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
const nodemailer = require('nodemailer');

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
  const insights = 'these are some insights based on the logs';

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
    subject: 'New year resolution tracker - your weekly report is here!',
    text: 'Here is a summary of your progress this week. Here are some insights on how you can better acheive your goals. Click here to add a memo/reflection on your progress this week.',
    html: `<div><h2>Here is a summary of your progress this week</p>${logs.map(
      (log) => `<p>${log.type}</p>`
    )}<h2>Here are some insights on how you can better acheive your goals.</p><h2>Click <a href="https://nyrtracker.vercel.app">here</a> to add a memo/reflection on your progress this week.</h2></div>`,
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
