"use client";

import React, { useRef } from "react";
import styles from "./loginForm.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { onSubmit } from "@/app/_lib/login";

type Props = {};

const LoginForm = ({}: Props) => {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [state, formAction] = useFormState(onSubmit, {
    message: "",
  });
  const router = useRouter();
  const { pending } = useFormStatus();

  const showMessage = (messasge: string) => {
    if (messasge === "no_id") {
      idRef.current?.focus();
      return "아이디를 입력하세요.";
    }
    if (messasge === "id_pattern") {
      idRef.current?.focus();
      return "6자 이상 입력하세요";
    }
    if (messasge === "no_password") {
      pwRef.current?.focus();
      return "비밀번호를 입력하세요.";
    }
    if (messasge === "pw_pattern") {
      pwRef.current?.focus();
      return "6자 이상 입력하세요";
    }
    if (messasge === "no_user") {
      idRef.current?.focus();
      return "아이디가 존재하지 않습니다.";
    }
    if (messasge === "pw_incorrect") {
      pwRef.current?.focus();
      return "비밀번호가 일치하지 않습니다.";
    }
    if (messasge === "success") {
      router.replace("/mypage");
    }
    return null;
  };

  const setClassName = (label: string, message: string) => {
    if (label === "id") {
      if (
        message === "no_id" ||
        message === "user_exist" ||
        message === "id_pattern" ||
        message === "no_user"
      ) {
        return `${styles.errorLabel}`;
      } else return "";
    } else if (label === "pw") {
      if (
        message === "no_password" ||
        message === "pw_pattern" ||
        message === "pw_incorrect"
      ) {
        return `${styles.errorLabel}`;
      } else return "";
    } else return "";
  };

  return (
    <form className={styles.container} action={formAction}>
      <div className={styles.logo}>로그인</div>
      <div className={styles.inputWrapper}>
        <input
          id="id"
          name="id"
          className={setClassName("id", state?.message!)}
          placeholder="아이디(6자 이상)"
          ref={idRef}
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          className={setClassName("pw", state?.message!)}
          placeholder="비밀번호(6자 이상)"
          ref={pwRef}
          required
        />
      </div>
      <div className={styles.error}>{showMessage(state?.message || "")}</div>
      <div className={styles.btnLogin}>
        <button type="submit" disabled={pending}>
          로그인
        </button>
      </div>
      <Link href={"/signup"} className={styles.signup}>
        혹시 계정이 없나요?
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
