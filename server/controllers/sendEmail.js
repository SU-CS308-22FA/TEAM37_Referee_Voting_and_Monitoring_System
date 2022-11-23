import nodemailer from "nodemailer";


export default async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: "refree.management.system@gmail.com",
        pass: "ypsbgnbqhbzdkofq",
      },
    });

    await transporter.sendMail({
      from: "refree.management.system@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent!");
    console.log(error);
    return error;
  }
};
