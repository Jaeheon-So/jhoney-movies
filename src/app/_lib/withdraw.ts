"use server";

export const withdraw = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/list/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_V4}`,
    },
  });

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
