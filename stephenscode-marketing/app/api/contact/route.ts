import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, budget, message } = body

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transporter (using environment variables for email config)
    // You'll need to configure this with your actual email service
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company || 'Not provided'}
Service Interest: ${service}
Budget Range: ${budget || 'Not specified'}

Message:
${message}

---
Submitted: ${new Date().toLocaleString()}
    `

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'info@stephenscode.dev',
      subject: `New Contact: ${name} - ${service}`,
      text: emailContent,
      replyTo: email,
    })

    // Also send confirmation to the user
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting StephensCode',
      text: `Hi ${name},

Thank you for reaching out! We've received your message and will get back to you within 24 hours.

In the meantime, feel free to call us at (936) 323-4527 if you have any urgent questions.

Best regards,
StephensCode Team
https://www.stephenscode.dev

---
Your message:
${message}
      `,
    })

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
