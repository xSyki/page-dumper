import { createTransport } from 'nodemailer'

const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export const sendMail = ({
    to,
    subject,
    text,
    html,
}: {
    to: string
    subject: string
    text?: string
    html: string
}) =>
    transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
        html,
    })
