import { TrendMovieResponse } from "@/model/Movie";
import { QueryFunction } from "@tanstack/react-query";

export const getTrendMovies: QueryFunction<
  TrendMovieResponse,
  [_1: string, _2: string, dateType: string]
> = async ({ queryKey }) => {
  // await new Promise((resolve) => setTimeout(resolve, 20000000));
  const [_1, _2, dateType] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/trending/movie/${dateType}?language=ko-KR`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movies", "trends"],
      },
      // cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
