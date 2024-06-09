import User from "@/models/User";
import connectDB from "@/config/data";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";



export const POST = async(request) => {
    const { username , email ,password , confirmPassword } = await request.json();

    if (password !== confirmPassword) {
        return new NextResponse(
            JSON.stringify({error:"Pasword does not match"},{status:402})
        );
    }
    await connectDB();

    const existingUser = await User.findOne({email})

    if(existingUser) {
        return new NextResponse(
            JSON.stringify({error:"User already exists"},{status:402})
        );
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({username,email,password:hashedPassword})
    try {
        await newUser.save();
        return new NextResponse("User successfully registered",{status:200});
    } catch (error) {
        return new NextResponse(error,{status:404});
    }
}