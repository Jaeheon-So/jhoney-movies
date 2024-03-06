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
    async session({ session, token }) {
      if (session.user.image) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_V4}/account/${process.env.NEXT_PUBLIC_ACCOUNT_ID}/lists?page=1`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_V4}`,
              },
            }
          );
          if (!res.ok || res.status !== 200) {
            throw new Error("failed to fetch data");
          }
          const data = await res.json();
          let index = data.results.findIndex(
            (v: any) =>
              v.name === session.user.email &&
              v.description === session.user.name
          );
          if (index > -1) {
            return {
              ...session,
              user: { ...session.user, id: data.results[index].id },
            };
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
              throw new Error("failed to fetch data");
            }
            const data2 = await res.json();
            let index = data2.results.findIndex(
              (v: any) =>
                v.name === session.user.email &&
                v.description === session.user.name
            );
            if (index > -1) {
              return {
                ...session,
                user: { ...session.user, id: data.results[index].id },
              };
            }
          } // 여기까지 2페이지 부터 전체 확인 여기 넘어가면 계정 없음

          let newUserRes: any = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_V4}/list`,
            {
              method: "post",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_V4}`,
              },
              body: JSON.stringify({
                name: session.user.email as string,
                description: session.user.name as string,
                iso_3166_1: "KR",
                iso_639_1: "ko",
                public: true,
              }),
            }
          );
          if (!newUserRes.ok || newUserRes.status !== 201) {
            throw new Error("failed to fetch data");
          }
          if (newUserRes.status === 201) {
            newUserRes = await newUserRes.json();
          }

          return {
            ...session,
            user: { ...session.user, id: newUserRes.id },
          };
        } catch (error) {
          console.log(error);
          return session;
        }
      } else {
        return { ...session, user: { ...session.user, id: token.sub } };
      }
    },
  },
  ...authConfig,
});
