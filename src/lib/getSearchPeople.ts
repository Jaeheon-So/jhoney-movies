import { SearchPeopleResponse } from "@/model/People";
import { QueryFunction } from "@tanstack/react-query";

export const getSearchPeople: QueryFunction<
  SearchPeopleResponse,
  [_1: string, _2: string, q: string],
  number
> = async ({ queryKey, pageParam = 1 }) => {
  const [_1, _2, q] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/search/person?query=${q}&include_adult=false&language=ko-KR&page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["people", "search", q],
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
