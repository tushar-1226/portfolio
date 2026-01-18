import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, email, phone, message, method } = await request.json();

        // Basic validation
        if (!name || !message) {
            return NextResponse.json(
                { error: 'Name and message are required' },
                { status: 400 }
            );
        }

        // If method is WhatsApp, just return success (handled on frontend)
        if (method === 'whatsapp') {
            return NextResponse.json({ 
                success: true, 
                message: 'WhatsApp redirect initiated' 
            }, { status: 200 });
        }

        // Email validation for email method
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Check if API key is configured
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not configured');
            return NextResponse.json(
                { error: 'Email service is currently unavailable. Please email rockeytushar17@gmail.com directly.' },
                { status: 503 }
            );
        }

        // Initialize Resend only when needed
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'rockeytushar17@gmail.com',
            replyTo: email,
            subject: `Portfolio Contact from ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This email was sent from your portfolio contact form via Email method.</p>
        </div>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ 
                error: 'Failed to send email. Please contact rockeytushar17@gmail.com directly.',
                details: error.message 
            }, { status: 500 });
        }

        console.log('Email sent successfully:', data);
        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
