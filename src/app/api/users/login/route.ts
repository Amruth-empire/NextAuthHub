import connectDB  from "@/config/dbConfig";
import usermodel from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        //check if user exist or not
        const user = await usermodel.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        //check if password is correct
        const validPassword =await bcrypt.compare(password, user.password) //user is from DB

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }   

        //create token data

        const tokenData = {
            id: user._id,
            username: user.username
        }

        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;



    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}