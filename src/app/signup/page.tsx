"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    // confirmPassword: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      console.log("SIGNUP 1");
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response.status === 200) {
        console.log("SIGNUP SUCCESSFUL 201");
        router.push("/login");
      }
      // console.log(response);
      console.log("SIGNUP SUCCESSFUL", response);
      // router.push("/login");
      console.log("SIGNUP SUCCESSFUL 2");
    } catch (error: any) {
      console.log("sign up failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      // user.confirmPassword === user.password &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center bg-slate-700 min-h-full">
      <div className="">
        <div className="flex flex-wrap -mx-3 mb-6 mt-6 justify-center items-center">
          <h1>{isLoading ? "processing" : "Sign up"}</h1>
        </div>
        <form className=" flex flex-col space-y-2">
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              className="text-black"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="">
            <label htmlFor="password">Password</label>
            <input
              className="text-black"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          {/* <div className="">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              className="text-black"
              id="confirmPassword"
              type="password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
          </div> */}
          <div className="">
            <label htmlFor="username">Username</label>
            <input
              className="text-black"
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
            <button type="submit" onClick={onSignup}>
              {buttonDisabled ? "Cannot signup" : "Sign up"}
            </button>
          </div>
        </form>
        <Link href="/login">go to login</Link>
      </div>
    </div>
  );
}
