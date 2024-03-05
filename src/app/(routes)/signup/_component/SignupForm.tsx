import React from "react";
import styles from "./signupForm.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import Link from "next/link";

type Props = {};

const SignupForm = ({}: Props) => {
  return (
    <form className={styles.container}>
      <div className={styles.logo}>회원가입</div>
      <div className={styles.inputWrapper}>
        <input placeholder="아이디" />
        <input placeholder="비밀번호" />
      </div>
      <div className={styles.btnLogin}>
        <button type="submit">회원가입</button>
      </div>
      <Link href={"/login"} className={styles.signup}>
        이미 가입한 계정이 있나요?
      </Link>
      <div className={styles.tagline}>소셜 계정으로 간편 가입</div>
      <div className={styles.socialWrapper}>
        <div className={`${styles.svgWrapper} ${styles.google}`}>
          <FcGoogle />
        </div>
        <div className={`${styles.svgWrapper} ${styles.kakao}`}>
          <RiKakaoTalkFill />
        </div>
        <div className={styles.svgWrapper}>
          <FaGithub />
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
