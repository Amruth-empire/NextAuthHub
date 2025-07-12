import { getDataFromToken } from "../../../../helpers/gettoken";
import { NextRequest, NextResponse } from "next/server";
import usermodel from "../../../../models/usermodel";
import connectDB from "../../../../config/dbConfig";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userid = await getDataFromToken(request);
        const user = await usermodel.findById({ _id: userid }).select("-password"); //not seleting password
        return NextResponse.json({ message: "user found", user: user });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}