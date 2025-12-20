import nodemailer from "nodemailer"

export const sendDemoRequestEmail = async (data: {
  name: string
  email: string
  phone: string
  company: string
  date: string
  message: string
}) => {
  console.log("Sending email to demo@saga.co.id:", data)

  if (!process.env.SMTP_HOST) {
    console.warn("SMTP credentials missing. Using mock.")
    return true
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: '"Sahabat Warga" <no-reply@saga.co.id>',
    to: "demo@saga.co.id",
    subject: `New Demo Request: ${data.name}`,
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      Company: ${data.company}
      Preferred Date: ${data.date}
      Message: ${data.message}
    `,
  })

  return true
}
