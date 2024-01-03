const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async ({ email, html, subject }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.NAME_EMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Shoes store" <no_reply@shoes.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    html, // html body
  });
});

module.exports = sendEmail;
