import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

//make sure we're connected to the database
connect();

// function to handle POST requests to /api/users/signup
export async function POST(request: NextRequest) {
  try {
    //get the request body
    const reqBody = await request.json();
    console.log(reqBody);
    //destructure the request body
    const { username, password, email } = reqBody;

    //check if user exists using the email
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User with that email already exists" },
        { status: 400 }
      );
    }
    //hash the password
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //send back the new user
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
