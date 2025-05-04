import { type Metadata } from "next";
import ProfileForm from "./ProfileForm";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Login | FE Camp",
  description: "Login Page",
};

export default function Login() {
  return (
    <>
      <Toaster />
      <ProfileForm />
    </>
  );
}
