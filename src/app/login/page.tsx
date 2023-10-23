"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const gohome = () => {
    router.push(`/`);
  };

  const onLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      axios.post("/api/users/login", user);
      console.log("LOGIN SUCCESSFUL");
      router.push(`/profile`);
    } catch (error: any) {
      console.log("login failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center bg-slate-700 min-h-full">
      <div className="">
        <div className="flex flex-wrap -mx-3 mb-6 mt-6 justify-center items-center">
          <h1>{isLoading ? "Processing" : "Login"}</h1>
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

          <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
            <button type="submit" onClick={onLogin}>
              {buttonDisabled ? "Cannot login" : "Login"}
            </button>
          </div>
        </form>
        <button onClick={gohome}> hello world</button>
        <Link href="/signup">go to signup</Link>
      </div>
    </div>
  );
}
