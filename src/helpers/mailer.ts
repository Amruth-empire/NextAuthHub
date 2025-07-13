import nodemailer from "nodemailer";
import usermodel from "../models/usermodel";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(rawToken, 10);


        if (emailType === "VERIFY") {

            await usermodel.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });

        }
        else if (emailType === "RESET") {
            await usermodel.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )


        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER!,
                pass: process.env.MAILTRAP_PASS!
            }

        });

        const link =
            emailType === "VERIFY"
                ? `${process.env.DOMAIN}/verifyemail?token=${rawToken}`
                : `${process.env.DOMAIN}/resetpassword?token=${rawToken}`;


        const mailOptions = {
            from: 'msamruth74@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${link}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser:<br> ${link}</p>`,

        }
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}