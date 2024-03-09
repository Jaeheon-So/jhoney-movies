import { TopRatedMovieResponse } from "@/model/Movie";
import { QueryFunction } from "@tanstack/react-query";

export const getDiscoverTMovie: QueryFunction<
  TopRatedMovieResponse,
  [
    _1: string,
    _2: string,
    _3: string,
    searchParams: { sort_by?: string; with_genres?: string }
  ],
  number
> = async ({ queryKey, pageParam }) => {
  const [_1, _2, _3, searchParams] = queryKey;
  const urlSearchParams = new URLSearchParams(searchParams);

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/discover/movie?${urlSearchParams.toString()}&include_adult=false&include_video=false&without_genres=99,10755&vote_count.gte=200&language=ko-KR&page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movies", "top-rated", "movie", urlSearchParams.toString()],
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
