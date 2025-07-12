import connectDB from "@/config/dbConfig";
import usermodel from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody;

        //Check if user already exist
        const user = await usermodel.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 })
        }

        //Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Creating the new user
        const newUser = new usermodel({
            username: username,
            email: email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser)

        //send verification email

        await sendEmail({email:email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })



    } catch (error: any) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}

