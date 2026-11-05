import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 1. Always persist message to Owner Access store (never lost!)
    const saved = saveContactMessage({
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject).trim(),
      message: String(message).trim(),
    });

    let emailed = false;

    // 2. Dispatch email notification if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Inquiries <onboarding@resend.dev>",
            to: "tanvirahmmed13579@gmail.com",
            reply_to: email,
            subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #1a1e24; border-radius: 12px; background-color: #0c0e12; color: #f2f1ed;">
                <div style="border-bottom: 2px solid #00D9FF; padding-bottom: 12px; margin-bottom: 20px;">
                  <h2 style="color: #00D9FF; margin: 0; font-size: 20px; font-weight: 700;">New Direct Dispatch from Portfolio</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #8892b0; width: 120px;">Sender:</td>
                    <td style="padding: 8px 0; color: #f2f1ed; font-weight: 600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #8892b0;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00D9FF; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #8892b0;">Subject:</td>
                    <td style="padding: 8px 0; color: #f2f1ed;">${subject}</td>
                  </tr>
                </table>
                <div style="background-color: #151921; border-radius: 8px; padding: 18px; margin-bottom: 20px; border-left: 3px solid #00D9FF;">
                  <p style="margin: 0; color: #8892b0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message Content</p>
                  <p style="margin: 0; color: #f2f1ed; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
                <div style="text-align: center; margin-top: 24px;">
                  <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background-color: #00D9FF; color: #08090B; padding: 10px 24px; border-radius: 9999px; font-weight: 700; font-size: 13px; text-decoration: none;">Reply Directly to ${name}</a>
                </div>
              </div>
            `,
          }),
        });
        if (resendRes.ok) {
          emailed = true;
        } else {
          console.warn("Resend email dispatch error:", await resendRes.text());
        }
      } catch (err) {
        console.error("Resend fetch error:", err);
      }
    }

    // 3. Fallback: Web3Forms if configured
    if (!emailed && process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            from_name: `${name} (via Portfolio)`,
            to_email: "tanvirahmmed13579@gmail.com",
            reply_to: email,
            subject: `[Portfolio Inquiry] ${subject}`,
            message: `From: ${name} <${email}>\n\n${message}`,
          }),
        });
        if (web3Res.ok) emailed = true;
      } catch (err) {
        console.error("Web3Forms error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      emailed,
      messageId: saved.id,
      timestamp: saved.date,
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to process message transmission." },
      { status: 500 }
    );
  }
}
