import { PopularPeopleResponse } from "@/model/People";
import { QueryFunction } from "@tanstack/react-query";

export const getPopularPeople: QueryFunction<
  PopularPeopleResponse,
  [_1: string, _2: string],
  number
> = async ({ queryKey, pageParam }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/person/popular?language=ko-KR&page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["people", "popular"],
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
