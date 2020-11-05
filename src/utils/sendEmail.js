const nodemailer = require("nodemailer");

const sendEmail = async (to, text) => {
  try {
    console.log("Sending token ", text);
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transport.sendMail({
      from: "827deec2db-97167b@inbox.mailtrap.io",
      to: "zorand1986@gmail.com",
      subject: "Password reset request",
      text,
    });

    console.log("Message sent to ", info.messageId);
    return true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;
