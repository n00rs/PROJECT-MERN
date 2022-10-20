const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const sendVerifyEmail = async (email) => {
  console.log(process.env.USER, process.env.PASS);
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL_ID,
      pass: process.env.PASS,
    },
  });

  const token = jwt.sign({ email }, process.env.EMAIL_SECRET, {
    expiresIn: "1d",
  });
  console.log(token);
  let mailOptions;
  const sender = "CRAZY Mountainers";
  mailOptions = {
    from: sender,
    to: email,
    subject: "EMAIL VERIFICATION",
    html: `Press <a href="http://localhost:3000/emailVerify/${token}" > here</a> 
    to verify your email and welcome to the world of adventures`,
  };

  const send = await transport.sendMail(mailOptions);
  return send;
  // (err, res) => {
  //   if (err) throw { status: 500, message: `nodemailer Failed ${err.message}` };
  //   else return res;
  // });
};

module.exports = sendVerifyEmail;
