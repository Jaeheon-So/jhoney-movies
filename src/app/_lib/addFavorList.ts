export const addFavorList = async (arg: {
  list_id: string;
  detail_type: string;
  detail_id: number;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_V4}/list/${arg.list_id}/items`,
    {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_V4}`,
      },
      body: JSON.stringify({
        items: [{ media_type: arg.detail_type, media_id: arg.detail_id }],
      }),
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
