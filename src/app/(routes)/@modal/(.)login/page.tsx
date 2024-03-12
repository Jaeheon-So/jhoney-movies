import React from "react";
import LoginForm from "../../login/_component/LoginForm";
import LoginModal from "./_component/LoginModal";

const InterceptLoginPage = () => {
  return (
    <LoginModal>
      <LoginForm isModal={true} />
    </LoginModal>
  );
};

export default InterceptLoginPage;
