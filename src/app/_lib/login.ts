"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const onSubmit = async (prevState: any, formData: FormData) => {
  if (!formData.get("id") || !(formData.get("id") as string).trim()) {
    return { message: "no_id", callbackUrl: prevState.callbackUrl };
  }
  if ((formData.get("id") as string).trim().length < 6) {
    return { message: "id_pattern", callbackUrl: prevState.callbackUrl };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string).trim()
  ) {
    return { message: "no_password", callbackUrl: prevState.callbackUrl };
  }
  if ((formData.get("password") as string).trim().length < 6) {
    return { message: "pw_pattern", callbackUrl: prevState.callbackUrl };
  }

  let shouldRedirect = false;
  try {
    await signIn("credentials", {
      username: formData.get("id"),
      password: formData.get("password"),
      redirect: false,
    });
    shouldRedirect = true;
    // return { message: "success" };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CallbackRouteError") {
        return { message: "no_user", callbackUrl: prevState.callbackUrl };
      } else if (error.type === "CredentialsSignin") {
        return { message: "pw_incorrect", callbackUrl: prevState.callbackUrl };
      }
    }
  }

  if (shouldRedirect) redirect(prevState.callbackUrl || "/");
};
