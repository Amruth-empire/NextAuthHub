import connectDB from "../../../../config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import usermodel from "../../../../models/usermodel";
import bcrypt from "bcryptjs";


connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody

        const users = await usermodel.find({
            verifyTokenExpiry: { $gt: Date.now() }
        });

        let matchedUser = null;
        for (const u of users) {
            const isMatch = await bcrypt.compare(token, u.verifyToken);
            if (isMatch) {
                matchedUser = u;
                break;
            }
        }

        if (!matchedUser) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        matchedUser.isVerified = true;
        matchedUser.verifyToken = undefined;
        matchedUser.verifyTokenExpiry = undefined;

        await matchedUser.save();

        return NextResponse.json({ message: "Email verified successfully", success: true });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
