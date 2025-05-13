"use server";

const brevoapi = process.env.BREVO_API_KEY;

if (!brevoapi) {
  throw new Error("BREVO_API_KEY is not defined in the environment variables.");
}

export const sendResetEmail = async (email: string, link: string) => {
  const emailContent = `
    <p>Hello,</p>
    <p>We received a request to reset your password. Click the link below to set a new password:</p>
    <p><a href="${link}">Reset Your Password</a></p> 
    <p>If you didn’t request this, please ignore this email.</p>
    <p>Thank you,</p>
    <p>FE18 IT team</p>
  `;

  const msg = {
    sender: {
      name: "FECAMP IT",
      email: "fecamp18chula@gmail.com",
    },
    to: [{ email }],
    subject: "Reset Password for FEcamp account",
    htmlContent: emailContent,
  };

  try {
    console.log(brevoapi);
    
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoapi,
      },
      body: JSON.stringify(msg),
    }); 

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Brevo failed to send email:', errorText);
      throw new Error(`Brevo email sending failed: ${errorText}`);
    }

    return {
      message: 'Email sent!',
      status: 200,
    };
  } catch (error) {
    console.error('Error sending reset email:', error instanceof Error ? error.message : 'Unknown error');
    throw new Error('Failed to send reset email. Please try again later.');
  }
};
