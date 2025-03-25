"use client";
import { signIn } from "next-auth/react";

const MockAuthLoginButton = () => {
  const handleLogin = () => {
    void signIn("credentials", {
      username: "username",
      password: "password",
    });
  };
  return (
    <button onClick={handleLogin} className="rounded-xl bg-gray-600 px-5 py-2">
      Mock Auth Login
    </button>
  );
};

export default MockAuthLoginButton;
