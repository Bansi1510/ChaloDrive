import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
})

export const sendMail = async (to: string, subject: string, html: string) => {
  transporter.sendMail({
    from: `"Chalo-Drive"  <${process.env.USER}>`,
    to,
    subject,
    html
  })
}