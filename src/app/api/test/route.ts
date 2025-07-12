// app/api/test/route.ts
import connectDB from "@/config/dbConfig";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  return NextResponse.json({ message: "Database connected successfully ✅" });
}
