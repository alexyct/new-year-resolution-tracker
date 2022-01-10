import { useSession, signIn, signOut } from 'next-auth/react';

// import { sendMail } from '@/lib/mail.js';

export default function TestPage() {
  const { data: session } = useSession();

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
