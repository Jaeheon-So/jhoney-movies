import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export default {
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
        console.log("hello");
        const user = { id: "1", email: "hello", name: "소" };
        if (!user) return null;
        return user;

        // let res = await fetch("전체 리스트 불러오기 1페이지")
        // if(res.ok) res = await res.json()
        // let index = res.result.findIndex((v) => v.name === credentials.id)

        // if( index > -1) {
        //   if(res.result[index].description === credentials.password) {
        //     return {
        //       id: res.result[index].id,
        //       email: res.result[index].name,
        //     }
        //   } else {
        //     return null // 비밀번호 틀림
        //   }
        // }
        // // 1페이지에 없으면 밑으로

        // for(let i = 2; i <= res.totalPage; i++){
        //   let res = await fetch("전체 리스트 불러오기", {page: i})
        //   if(res.ok) res = await res.json()
        //   let index = res.result.findIndex((v) => v.name === credentials.id)

        //   if( index > -1) {
        //     if(res.result[index].description === credentials.password) {
        //       return {
        //         id: res.result[index].id,
        //         email: res.result[index].name,
        //       }
        //     } else {
        //       return null // 비밀번호 틀림
        //     }
        //   }
        // }
        // // 계정 없음
        // return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
