const express = require("express");
const cors = require("cors");
const Mailgun = require("mailgun.js");

const formData = require("form-data");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "taker",
  key: process.env.key,
});
app.post("/form", async (req, res) => {
  try {
    console.log(req.body);
    const messageData = {
      from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
      to: "laid_94@hotmail.com",
      subject: req.body.subject,
      text: req.body.message,
    };
    const response = await client.messages
      .create(process.env.domain, messageData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(response);
    res.status(500).json({ message: response });
  } catch (error) {}
});

app.get("*", (req, res) => {
  res.status(400).json({ message: " t'es perdu" });
});

app.listen(process.env.port, () => {
  console.log("server started");
});
