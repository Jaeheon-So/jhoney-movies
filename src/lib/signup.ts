"use server";

import { ListResponse } from "@/model/List";

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
    const data: ListResponse = await res.json();
    let index = data.results.findIndex(
      (v) => v.name === (formData.get("id") as string)
    );
    if (index > -1) {
      return { message: "user_exist" };
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
      const data2: ListResponse = await res.json();
      const index = data2.results.findIndex(
        (v) => v.name === (formData.get("id") as string)
      );
      if (index > -1) {
        return { message: "user_exist" };
      }
    } // 여기까지 2페이지 부터 전체 확인 여기 넘어가면 create(회원가입) 진행

    const newUserRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_V4}/list`,
      {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_V4}`,
        },
        body: JSON.stringify({
          name: formData.get("id") as string,
          description: formData.get("password") as string,
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
      return {
        message: "success",
        id: formData.get("id") as string,
        password: formData.get("password") as string,
      };
    }
  } catch (error: any) {
    return { message: "서버 에러 발생" };
  }
};
