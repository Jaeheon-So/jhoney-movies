import { IMovieResponse } from "@/model/movie";
import { QueryFunction } from "@tanstack/react-query";

export const getTrendMovies: QueryFunction<
  IMovieResponse,
  [_1: string, _2: string]
> = async ({ queryKey }) => {
  // await new Promise((resolve) => setTimeout(resolve, 20000000));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/trending/movie/day?language=ko-KR`,
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
