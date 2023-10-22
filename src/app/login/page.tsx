"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex flex-col items-center justify-center bg-slate-700 min-h-full">
      <div className="">
        <div className="flex flex-wrap -mx-3 mb-6 mt-6 justify-center items-center">
          <h1>Login</h1>
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
              Login
            </button>
          </div>
        </form>
        <Link href="/signup">go to signup</Link>
      </div>
    </div>
  );
}
