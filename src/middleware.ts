import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLogin = !!req.auth;
  const pathname = req.nextUrl.pathname;
  const encodedCallbackUrl = encodeURIComponent(pathname);

  if (isLogin && pathname === "/signup") {
    return NextResponse.redirect(`http://localhost:3000/mypage`);
  }

  if (isLogin && pathname === "/login") {
    return NextResponse.redirect(`http://localhost:3000/mypage`);
  }

  if (!isLogin && pathname === "/mypage") {
    console.log("qwe: ", isLogin);
    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl)
    );
  }

  return;
});

export const config = {
  matcher: ["/mypage", "/signup", "/login"],
};
