import { TopRatedTvResponse } from "@/model/Movie";
import { QueryFunction } from "@tanstack/react-query";

export const getDiscoverTTv: QueryFunction<
  TopRatedTvResponse,
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
    }/discover/tv?${urlSearchParams.toString()}&include_adult=false&vote_count.gte=200&language=ko-KR&with_origin_country=KR&page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movies", "top-rated", "tv", urlSearchParams.toString()],
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
