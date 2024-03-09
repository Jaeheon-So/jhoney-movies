import React from "react";
import SignupForm from "./_component/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입 | JHONEYDB",
  description: "회원가입하여 마음에 드는 영화를 저장해보세요.",
};

const SignupPage = () => {
  return <SignupForm />;
};

export default SignupPage;
