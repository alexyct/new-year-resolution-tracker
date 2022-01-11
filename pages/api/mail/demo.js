import ReactDOMServer from 'react-dom/server';
import nodemailer from 'nodemailer';

function DemoMail() {
  return (
    <div>
      <p>Hi NAME! Here is a pretty visual to show your progress this week:</p>
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
