const nodemailer = require('nodemailer');

export function sendMail() {
  let mailOptions = {
    from: 'newyearresolutiontracker@gmail.com',
    to: 'taiwan.alex2000@gmail.com;',
    subject: 'Email from Node-App: A Test Message!',
    text: 'Some content to send',
  };

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'newyearresolutiontracker@gmail.com',
      pass: 'Tracker123!',
    },
  });
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export default sendMail;
