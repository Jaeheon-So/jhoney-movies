import {
  DetailMovieResult,
  DetailTvResult,
  ListDetailResponse,
} from "@/model/List";
import { QueryFunction } from "@tanstack/react-query";
import { getFavorList } from "./getFavorList";

export const getAllFavorList: QueryFunction<
  (DetailMovieResult | DetailTvResult)[],
  [_1: string, _2: string, id: string]
> = async ({ queryKey }) => {
  const [_1, _2, id] = queryKey;
  const res: ListDetailResponse = await getFavorList(id, 1);

  const reqArr = [];
  for (let i = 2; i <= res.total_pages; i++) {
    reqArr.push(getFavorList(id, i));
  }

  const res2 = await Promise.all(reqArr).then((res: ListDetailResponse[]) => {
    const allPageRes = res.map((res) => res.results);
    const reducedAllPageData = allPageRes.reduce((acc, cur) => {
      return [...acc, ...cur];
    }, []);
    return reducedAllPageData;
  });

  return [...res.results, ...res2];
};
