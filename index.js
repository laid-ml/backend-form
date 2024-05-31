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
  key: "4b078c8eda96d9137888fe2cb99e8169-0996409b-2097f8ef",
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
      .create(
        "sandboxbcf18311306b4e12ae795a3b29d90202.mailgun.org",
        messageData
      )
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

app.listen(3000, () => {
  console.log("server started");
});
