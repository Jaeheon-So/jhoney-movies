import React from "react";
import LoginForm from "../../login/_component/LoginForm";
import LoginModal from "./_component/LoginModal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 | HONEY-BOX",
  description: "로그인하여 마음에 드는 영화를 저장해보세요.",
};

const InterceptLoginPage = () => {
  return (
    <LoginModal>
      <LoginForm isModal={true} />
    </LoginModal>
  );
};

export default InterceptLoginPage;
