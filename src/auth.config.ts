import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { ListResponse } from "./model/List";

export default {
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID as string,
      clientSecret: process.env.KAKAO_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Credentials({
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_V4}/account/${process.env.NEXT_PUBLIC_ACCOUNT_ID}/lists?page=1`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_V4}`,
            },
          }
        );
        if (!res.ok || res.status !== 200) {
          return null;
        }
        const data = await res.json();
        let index = data.results.findIndex(
          (v: any) => v.name === credentials.username
        );
        if (index > -1) {
          if (data.results[index].description === credentials.password) {
            return {
              id: data.results[index].id,
              email: data.results[index].name,
            };
          } else {
            return null; // 비밀번호 틀림
          }
        } // 여기까지 1페이지 확인, id 있으면 유저 존재

        for (let i = 2; i <= data.total_pages; i++) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_V4}/account/${process.env.NEXT_PUBLIC_ACCOUNT_ID}/lists?page=${i}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_V4}`,
              },
            }
          );
          if (!res.ok || res.status !== 200) {
            return null;
          }
          const data2 = await res.json();
          const index = data2.results.findIndex(
            (v: any) => v.name === credentials.username
          );
          if (index > -1) {
            if (data.results[index].description === credentials.password) {
              return {
                id: data.results[index].id,
                email: data.results[index].name,
              };
            } else {
              return null; // 비밀번호 틀림
            }
          }
        } // 여기까지 2페이지 부터 전체 확인 여기 넘어가면 계정 없음

        return Promise.reject("no_user");
      },
    }),
  ],
} satisfies NextAuthConfig;
