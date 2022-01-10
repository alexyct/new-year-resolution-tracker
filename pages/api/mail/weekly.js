const nodemailer = require('nodemailer');
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({
      error: 'Method Not Allowed',
    });
  }

  let mailOptions = {
    from: 'newyearresolutiontracker@gmail.com',
    to: req.body.emailTo,
    subject: 'New year resolution tracker - your weekly report is here!',
    text: 'Here is a summary of your progress this week. Here are some insights on how you can better acheive your goals. Click here to add a memo/reflection on your progress this week.',
    html: '<div><p>Here is a summary of your progress this week</p><p>Here are some insights on how you can better acheive your goals.</p><p>Click <a href="https://nyrtracker.vercel.app">here</a> to add a memo/reflection on your progress this week.</p></div>',
  };

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return res.status(200).json({ sent: 'ok' });
  } catch (error) {
    console.error(`Failed to send email: `, error);
    return res.status(400).send({
      error: 'Could not send the email',
    });
  }
}
