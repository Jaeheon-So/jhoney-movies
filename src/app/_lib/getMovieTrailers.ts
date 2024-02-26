import { QueryFunction } from "@tanstack/react-query";

export const getMovieTrailers = async (id: number) => {
  // await new Promise((resolve) => setTimeout(resolve, 20000000));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}/videos?language=ko-KR`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movies", "trailer", id.toString()],
      },
      // cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
