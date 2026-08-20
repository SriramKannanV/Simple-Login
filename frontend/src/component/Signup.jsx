import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name, email }),
    });
    const data = await res.json();
    if (!res.ok) {
      window.alert(data.Error);
    } else {
      localStorage.setItem("cur_user", data.user_name);
      localStorage.setItem("email", data.email);
      navigate("/home");
    }
  };

  return (
    <div className="bg-slate-300 w-full h-screen flex justify-center items-center">
      <form className="flex flex-col w-1/4 bg-white p-8 rounded gap-y-4 shadow-xl">
        <h1 className="text-center text-3xl font-bold mb-4">Sign Up</h1>
        <label
          className="font-semibold text-slate-950 w-fit"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="bg-slate-100 rounded p-2.5 outline-none shadow-md"
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser_name(e.target.value)}
          value={user_name}
        />
        <label className="font-semibold text-slate-950 w-fit" htmlFor="email">
          Email
        </label>
        <input
          className="bg-slate-100 rounded p-2.5 outline-none shadow-md"
          type="text"
          id="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button
          className="bg-slate-950 text-white p-3 rounded cursor-pointer shadow-md font-semibold"
          onClick={(e) => handleSignup(e)}
        >
          Sign Up
        </button>
        <p className="text-center text-sm">
          Already have account?{" "}
          <span className="text-blue-500 cursor-pointer">
            <Link to="/api/login">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
