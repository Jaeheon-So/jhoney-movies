import { SearchTvResponse } from "@/model/Movie";
import { QueryFunction } from "@tanstack/react-query";

export const getSearchTv: QueryFunction<
  SearchTvResponse,
  [_1: string, _2: string, _3: string, q: string],
  number
> = async ({ queryKey, pageParam = 1 }) => {
  const [_1, _2, _3, q] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/search/tv?query=${q}&include_adult=false&language=ko-KR&page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movies", "search", "tv", q],
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
