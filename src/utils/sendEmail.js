const nodemailer = require("nodemailer");

const sendEmail = async (to, text) => {
  try {
    console.log("Sending token ", text);
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f422b77fdcdaa2",
        pass: "97c5d6a98d7a80",
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
