import { CombinedCreditResponse } from "@/model/People";
import { QueryFunction } from "@tanstack/react-query";

export const getCombinedCredit: QueryFunction<
  CombinedCreditResponse,
  [_1: string, _2: string, id: string]
> = async ({ queryKey }) => {
  const [_1, _2, id] = queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/person/${id}/combined_credits?language=ko-KR`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["people", "credit", id],
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
