export const getFavorList = async (id: string, page: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_V4}/list/${id}?language=ko-KR&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_V4}`,
      },
      next: {
        tags: ["auth", "favor", id.toString()],
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
