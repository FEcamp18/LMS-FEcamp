"use client";
import { signIn } from "next-auth/react";

export default function Dev() {
  const handleLogin = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    void signIn("credentials", {
      username,
      password,
    });
  };
  return (
    <div className="flex h-[600px] flex-row items-center justify-center space-x-5">
      <button
        onClick={() =>
          handleLogin({
            username: "camper1",
            password: "securepassword3",
          })
        }
        className="rounded-xl bg-gray-600 px-5 py-2 text-white"
      >
        Login As CAMPER1
      </button>
      <button
        onClick={() =>
          handleLogin({
            username: "staff1",
            password: "securepassword1",
          })
        }
        className="rounded-xl bg-gray-600 px-5 py-2 text-white"
      >
        Login As STAFF1
      </button>
      <button
        onClick={() =>
          handleLogin({
            username: "admin",
            password: "securepassword1",
          })
        }
        className="rounded-xl bg-gray-600 px-5 py-2 text-white"
      >
        Login As BOARD
      </button>
    </div>
  );
}
