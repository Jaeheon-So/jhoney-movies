import { create } from "zustand";

export type SortOptionType =
  | "popularity.desc"
  | "vote_average.desc"
  | "first_air_date.desc";

export interface TvFilterState {
  sortOption: SortOptionType;
  genreOption: { [key: number]: boolean };
  setSortOption: (
    option: "popularity.desc" | "vote_average.desc" | "first_air_date.desc"
  ) => void;
  setGenreOption: (option: number, value?: boolean) => void;
  resetGenre: () => void;
}

export const genres: [number, string][] = [
  [10579, "액션&어드벤처"],
  [16, "애니메이션"],
  [35, "코미디"],
  [80, "범죄"],
  [99, "다큐멘터리"],
  [18, "드라마"],
  [10751, "가족"],
  [10762, "어린이"],
  [9648, "미스터리"],
  [10763, "뉴스"],
  [10764, "리얼리티"],
  [10765, "SF&판타지"],
  [10766, "연속극"],
  [10767, "토크"],
  [10768, "전쟁&정치"],
  [37, "서부"],
];

// const URLSearch = new URLSearchParams(location.search || "");
export const initialGenreOption: { [key: number]: boolean } = {
  10579: false,
  16: false,
  35: false,
  80: false,
  99: false,
  18: false,
  10751: false,
  10762: false,
  9648: false,
  10763: false,
  10764: false,
  10765: false,
  10766: false,
  10767: false,
  10768: false,
  37: false,
};

// URLSearch.get("with_genres")
//   ?.split(".")
//   .forEach((genre) => {
//     initialGenreOption[Number(genre)] = true;
//   });

// const initailSortOption =
//   (URLSearch.get("sort_by") as SortOptionType) || "popularity.desc";

export const useTvFilterStore = create<TvFilterState>((set, get) => ({
  sortOption: "popularity.desc",
  genreOption: initialGenreOption,
  setSortOption: (option) => {
    set({ sortOption: option });
  },
  setGenreOption: (option, value) => {
    if (value === undefined) {
      set({
        genreOption: {
          ...get().genreOption,
          [option]: !get().genreOption[option],
        },
      });
    } else {
      set({
        genreOption: {
          ...get().genreOption,
          [option]: value,
        },
      });
    }
  },
  resetGenre: () => {
    set({
      genreOption: initialGenreOption,
    });
  },
}));
