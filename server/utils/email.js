import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'career.compass00@gmail.com',
      pass: "wjcz bsdp wcgd bpyt",
    },
  });


export const sendVerificationEmail = async (email, otp) => {
    const mailOptions = {
        from: 'career.compass00@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP code is ${otp}. Please enter this code to verify your account.`,
    };

    try {
        console.log('Email User:', process.env.EMAIL_USER);
        console.log('Email Pass:', process.env.EMAIL_PASS);
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};
