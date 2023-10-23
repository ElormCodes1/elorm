import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//make sure we're connected to the database
connect();

// function to handle POST requests to /api/users/login
export async function POST(request: NextRequest) {
  try {
    //get the request body
    const reqBody = await request.json();
    console.log("THIS IS THE REQUEST BODY ", reqBody);
    //destructure the request body
    const { email, password } = reqBody;

    //check if user exists using the email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User with that email does not exist");
      return NextResponse.json(
        { error: "User with that email does not exist" },
        { status: 400 }
      );
    }
    //check if the password is correct
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    console.log("User exists and password is correct");
    console.log("THIS IS THE USER ", user);

    try {
      // const jwt = require("jsonwebtoken");
      //create token data
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          username: user.username,
        },
        process.env.TOKEN_SECRET!,
        {
          expiresIn: "1d",
        }
      );
      console.log("THIS IS THE TOKEN ", token);

      const response = NextResponse.json({
        message: "Login successful",
        success: true,
      });

      console.log("THIS IS THE RESPONSE ", response);

      //set the token as a cookie
      response.cookies.set("token", token, {
        httpOnly: true,
      });
      console.log("Token set as cookie");

      console.log("LOGIN SUCCESSFUL");

      return response;
    } catch (error: any) {
      console.log("THIS IS THE ERROR ", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } catch (error: any) {
    console.log("THIS IS THE ERROR ", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
