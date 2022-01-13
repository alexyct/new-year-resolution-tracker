### Overview of My Submission

For the MongoDB Atlas Hackathon, we created a web app to help you track and achieve your new year resolutions in 2022! Link to the project: [https://nyrtracker.vercel.app](https://nyrtracker.vercel.app/).

It is difficult staying on top of your new year resolutions. Two key reasons why people, including myself, fail to stay on top of their resolutions include:

- Forgetting about them over time
- Not knowing how to better achieve

Therefore, our web app uses MongoDB to address these issues by:

- Sending daily reminders for you to log data and track your progress
- Sending automated weekly reports to summarise your progress, provide insights on how you can better achieve your goals, and prompt you to write journals.
- Providing a dashboard to visualise your data/progress, display the insights in your weekly report, and provide a space to add memos about your resolutions.

This is an effective way to automate the data collection and analysis process that many of us go through (and forget about over time). Given the time constraints of the hackathon, our web app only supports exercising as a new year resolution.

Try out the app on [https://nyrtracker.vercel.app/](https://nyrtracker.vercel.app/) by signing up with your Google account. Alternatively, you can check out screenshots and a demo video below in this post. Enjoy!

### Submission Category:

Automation Innovation: We use MongoDB Atlas Serverless Instances to automate the weekly data aggregation and analysis I perform regarding my new year resolution progress tracking.

### Link to Code

{% github https://github.com/alexyct/new-year-resolution-tracker %}

### Additional Resources / Info

**Some technologies we used:**

- [Next.js](https://nextjs.org/) & [React](https://reactjs.org/)
- [MongoDB](https://mongodb.com/) Atlas Serverless Instances
- [Axios](https://axios-http.com/docs/intro) for HTTP requests
- [Next-auth](https://next-auth.js.org/) for authentication
- [Nodemailer](https://nodemailer.com/) & [Easycron](https://www.easycron.com/) for daily and weekly emails
- [Google Charts](https://developers.google.com/chart) for data visualisation

**Some screenshots of the app:**
Dashboard
![Dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zhtl78mvafrq3ngbr5uz.png)

Add Data Screen
![Add Data Screen](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zaeqq0tq79gq7oagsp7h.png)

Add Memo Screen
![Add Memo Screen](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3l9hoyo735qjwjz77sj7.png)

Weekly Report Email
![Weekly Report Email](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n0m7p087a4tix2zlbjt3.png)

On Mobile
![Mobile View](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jo66n93vgk1exa71pof1.png)

For judges of the Hackathon, we recognise that you may not have time to actually try to app and wait a week for the automated reports. So if you sign in to the app, you will see buttons that sends you a demo of the weekly automated report (as well as demo of the daily reminders).

Hope you like our project!
