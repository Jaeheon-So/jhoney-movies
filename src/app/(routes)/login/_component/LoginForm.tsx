import React from "react";
import styles from "./loginForm.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import Link from "next/link";

type Props = {};

const LoginForm = ({}: Props) => {
  return (
    <form className={styles.container}>
      <div className={styles.logo}>로그인</div>
      <div className={styles.inputWrapper}>
        <input placeholder="아이디" />
        <input placeholder="비밀번호" />
      </div>
      <div className={styles.btnLogin}>
        <button type="submit">로그인</button>
      </div>
      <Link href={"/signup"} className={styles.signup}>
        혹시 아이디가 없나요?
      </Link>
      <div className={styles.tagline}>소셜 계정으로 간편 로그인</div>
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

export default LoginForm;
