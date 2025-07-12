import nodemailer from "nodemailer";
import usermodel from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedtoken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {

            await usermodel.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedtoken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        }
        else if (emailType === "RESET") {
            await usermodel.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedtoken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )


        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.user,
                pass: process.env.pass
            }
        });

        const mailOptions = {
            from: 'msamruth74@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedtoken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"} or copy paste the link below in your browser. <br> ${process.env.domain}/varifyemail?token=${hashedtoken}</P>`

        }
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;




    } catch (error: any) {
        throw new Error(error.message);
    }
}