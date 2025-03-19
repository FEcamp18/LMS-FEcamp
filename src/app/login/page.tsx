import { type Metadata } from "next";
import ProfileForm from "./ProfileForm";
import MockAuthLoginButton from "@/components/login/mockAuthLogin";
export const metadata: Metadata = {
  title: "Login | FE Camp",
  description: "Login Page",
};

export default function Login() {
  return (
    <>
      <ProfileForm />
      <MockAuthLoginButton />
    </>
  );
}
