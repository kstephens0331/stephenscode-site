import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      demoName,
      demoPackage,
      demoSlug,
      clientName,
      clientPhone,
      clientEmail,
      service,
      preferredDate,
      preferredTime,
      notes
    } = body

    // Validate required fields
    if (!demoName || !clientName || !clientPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Email content for YOU (the business owner)
    const ownerEmailContent = `
🎯 NEW LEAD FROM DEMO PORTFOLIO!

A potential client just interacted with your "${demoName}" demo and is interested in this design/package.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DEMO DETAILS:
   • Demo Name: ${demoName}
   • Package: ${demoPackage}
   • Demo URL: https://www.stephenscode.dev/demos/${demoSlug}

👤 CLIENT INFORMATION:
   • Name: ${clientName}
   • Phone: ${clientPhone}
   • Email: ${clientEmail || 'Not provided'}

💼 INTEREST DETAILS:
   • Service Requested: ${service || 'General inquiry'}
   • Preferred Date: ${preferredDate || 'Not specified'}
   • Preferred Time: ${preferredTime || 'Not specified'}
   ${notes ? `• Special Notes: ${notes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔥 ACTION REQUIRED:
This is a qualified lead who browsed your demo portfolio and liked the "${demoName}" design.

RECOMMENDED FOLLOW-UP:
1. Call/text ${clientPhone} within 24 hours
2. Reference the "${demoName}" demo they interacted with
3. Discuss how you can build something similar for their business
4. Send pricing based on the "${demoPackage}" package

💡 TIP: They already know your pricing and capabilities from the demo, so this is a warm lead!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lead captured: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CST
    `.trim()

    // Send email to business owner (YOU)
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'info@stephenscode.dev',
      subject: `🎯 NEW DEMO LEAD: ${clientName}, interested in "${demoName}" Design`,
      text: ownerEmailContent,
      replyTo: clientEmail || clientPhone,
    })

    // Optional: Send confirmation to client
    if (clientEmail) {
      const clientEmailContent = `
Hi ${clientName},

Thank you for your interest in our services! We received your request through our "${demoName}" demo.

We'll reach out to you within 24 hours to discuss how we can create something similar for your business.

In the meantime, feel free to explore more of our demos at:
https://www.stephenscode.dev/demos

Best regards,
StephensCode Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 (936) 323-4527
📧 info@stephenscode.dev
🌐 stephenscode.dev
      `.trim()

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: clientEmail,
        subject: `Thanks for your interest in StephensCode: ${demoName}`,
        text: clientEmailContent,
      })
    }

    return NextResponse.json({
      message: 'Lead captured successfully',
      success: true
    }, { status: 200 })

  } catch (error) {
    console.error('Demo lead capture error:', error)
    return NextResponse.json({
      error: 'Failed to capture lead',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
