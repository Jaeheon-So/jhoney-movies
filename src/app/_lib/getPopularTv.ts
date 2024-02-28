import { PopularTvResponse } from "@/model/Movie";
import { QueryFunction } from "@tanstack/react-query";

export const getPopularTv: QueryFunction<
  PopularTvResponse,
  [_1: string, _2: string, _3: string]
> = async ({ queryKey }) => {
  // await new Promise((resolve) => setTimeout(resolve, 20000000));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/discover/tv?include_adult=false&language=ko-KR&page=1&sort_by=popularity.desc&with_origin_country=KR`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movies", "popular", "tv"],
      },
      // cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
