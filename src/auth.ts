import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("callback signIn:", user);
      return true;
    },
    async session({ session, token }) {
      if (session.user.image) {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1"
        ).then((response) => response.json());
        return { ...session, user: { ...session.user, id: res.title } };

        // let res = await fetch("전체 리스트 불러오기 1페이지");
        // if (res.ok) res = await res.json();
        // let index = res.result.findIndex(
        //   (v) => v.name === session.user.email && v.desc === session.user.name
        // );

        // if (index > -1) {
        //   return {
        //     ...session,
        //     user: { ...session.user, id: res.result[index].id },
        //   };
        // }
        // // 1페이지에 없으면 밑으로
        // for (let i = 2; i <= res.totalPage; i++) {
        //   let res = await fetch("전체 리스트 불러오기", { page: i });
        //   if (res.ok) res = await res.json();
        //   let index = res.result.findIndex(
        //     (v) => v.name === session.user.email && v.desc === session.user.name
        //   );

        //   if (index > -1) {
        //     return {
        //       ...session,
        //       user: { ...session.user, id: res.result[index].id },
        //     };
        //   }
        // }
        // // 계정 없음 따라서 list 새로 만들어줘야함
        // let newUser = await fetch("새로운 리스트 생성", {
        //   method: "post",
        //   body: JSON.stringify({
        //     name: session.user.email,
        //     desc: session.user.name,
        //     l: "ko",
        //   }),
        // });
        // if (res.ok) newUser = await res.json();

        // return {
        //   ...session,
        //   user: { ...session.user, id: newUser.id },
        // };
      } else {
        return { ...session, user: { ...session.user, id: token.sub } };
      }
    },
  },
  ...authConfig,
});
