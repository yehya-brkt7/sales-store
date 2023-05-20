const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// define API endpoint for sending emails
app.post("/send-email", async (req, res) => {
  const { fname, lname, phone, email, message } = req.body;

  // create a Nodemailer transporter with your email service credentials
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "yaya.bt747@gmail.com",
      pass: "jwjtidfepsanuyfh",
    },
  });

  try {
    // send the email
    await transporter.sendMail({
      from: email,
      to: "yaya.bt747@gmail.com",
      html: `
      <p>First Name: ${fname}</p>
      <p>Last Name: ${lname}</p>
      <p>Phone: ${phone}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    `,
    });

    // respond with a success message
    res.send({ message: "Email sent successfully" });
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).send({ error: "Failed to send email" });
  }
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
