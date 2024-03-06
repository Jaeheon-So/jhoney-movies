"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const onSubmit = async (prevState: any, formData: FormData) => {
  if (!formData.get("id") || !(formData.get("id") as string).trim()) {
    return { message: "no_id" };
  }
  if ((formData.get("id") as string).trim().length < 6) {
    return { message: "id_pattern" };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string).trim()
  ) {
    return { message: "no_password" };
  }
  if ((formData.get("password") as string).trim().length < 6) {
    return { message: "pw_pattern" };
  }

  try {
    await signIn("credentials", {
      username: formData.get("id"),
      password: formData.get("password"),
      redirect: false,
    });
    return { message: "success" };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CallbackRouteError") {
        return { message: "no_user" };
      } else if (error.type === "CredentialsSignin") {
        return { message: "pw_incorrect" };
      }
    }
  }
};
