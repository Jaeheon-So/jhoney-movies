"use client";

import React, { useEffect, useRef } from "react";
import styles from "./signupForm.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { onSubmit } from "@/lib/signup";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useModalStore } from "@/store/confirmModal";

type Props = {};

const SignupForm = ({}: Props) => {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [state, formAction] = useFormState(onSubmit, {
    message: "",
  });
  const router = useRouter();
  const { pending } = useFormStatus();
  const { openModal, closeModal } = useModalStore();

  const formData = new FormData();

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
    if (messasge === "user_exist") {
      idRef.current?.focus();
      return "이미 사용 중인 아이디입니다.";
    }
    if (messasge === "success") {
      formData.append("id", state?.id as string);
      formData.append("password", state?.password as string);
      return null;
    }
    return messasge;
  };

  const setClassName = (label: string, message: string) => {
    if (label === "id") {
      if (
        message === "no_id" ||
        message === "user_exist" ||
        message === "id_pattern"
      ) {
        return `${styles.errorLabel}`;
      } else return "";
    } else if (label === "pw") {
      if (message === "no_password" || message === "pw_pattern") {
        return `${styles.errorLabel}`;
      } else return "";
    } else return "";
  };

  const checkAutoLogin = async () => {
    openModal({
      title: "로그인",
      content: (
        <div>
          회원가입 완료.
          <br />
          바로 로그인 하시겠습니까?
        </div>
      ),
      confirmCallback: async () => {
        closeModal();
        const res = await signIn("credentials", {
          username: formData.get("id"),
          password: formData.get("password"),
          callbackUrl: "/mypage",
        });

        if (!res?.error) return;
      },
      cancelCallback: () => {
        closeModal();
        router.replace("/");
      },
    });
  };

  const onClick = (provider: "google" | "github" | "kakao") => {
    signIn(provider, {
      callbackUrl: "/mypage",
    });
  };

  useEffect(() => {
    if (state?.message === "success") {
      checkAutoLogin();
    }
  }, [state?.message]);

  return (
    <form className={styles.container} action={formAction}>
      <div className={styles.logo}>회원가입</div>
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
          회원가입
        </button>
      </div>
      <Link href={"/login"} className={styles.signup}>
        이미 가입한 계정이 있나요?
      </Link>
      <div className={styles.tagline}>소셜 계정으로 간편 가입</div>
      <div className={styles.socialWrapper}>
        <div
          className={`${styles.svgWrapper} ${styles.google}`}
          onClick={() => onClick("google")}
        >
          <FcGoogle />
        </div>
        <div
          className={`${styles.svgWrapper} ${styles.kakao}`}
          onClick={() => onClick("kakao")}
        >
          <RiKakaoTalkFill />
        </div>
        <div className={styles.svgWrapper} onClick={() => onClick("github")}>
          <FaGithub />
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
