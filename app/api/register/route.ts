import User from "@/models/User";
import connectDB from "@/config/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, email, password, confirmPassword } = await req.json();

    if (password !== confirmPassword) {
        return NextResponse.json(
            { error: 'Passwords do not match.' },
            { status: 400 }
        );
    };

    await connectDB();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return NextResponse.json(
            { error: 'User already exists.' },
            { status: 400 }
        );
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, hashedPassword });

    try {
        await newUser.save();
        return new NextResponse("User successfully registered", { status: 201 })
        
    } catch (error) {
        if (error instanceof Error)
        return new NextResponse(error.message, { status: 500 });
    }
}
