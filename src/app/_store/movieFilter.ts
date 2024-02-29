import { create } from "zustand";

export type SortOptionType =
  | "popularity.desc"
  | "vote_average.desc"
  | "primary_release_date.desc";

export interface MovieFilterState {
  sortOption: SortOptionType;
  genreOption: { [key: number]: boolean };
  setSortOption: (
    option:
      | "popularity.desc"
      | "vote_average.desc"
      | "primary_release_date.desc"
  ) => void;
  setGenreOption: (option: number, value?: boolean) => void;
  resetGenre: () => void;
}

export const genres: [number, string][] = [
  [28, "액션"],
  [12, "모험"],
  [16, "애니메이션"],
  [35, "코미디"],
  [80, "범죄"],
  [99, "다큐멘터리"],
  [18, "드라마"],
  [10751, "가족"],
  [14, "판타지"],
  [36, "역사"],
  [27, "공포"],
  [10402, "음악"],
  [9648, "미스터리"],
  [10749, "로맨스"],
  [878, "SF"],
  [10770, "TV 영화"],
  [53, "스릴러"],
  [10752, "전쟁"],
  [37, "서부"],
];

const URLSearch = new URLSearchParams(location.search);
export const initialGenreOption: { [key: number]: boolean } = {
  28: false,
  12: false,
  16: false,
  35: false,
  80: false,
  99: false,
  18: false,
  10751: false,
  14: false,
  36: false,
  27: false,
  10402: false,
  9648: false,
  10749: false,
  878: false,
  10770: false,
  53: false,
  10752: false,
  37: false,
};

URLSearch.get("with_genres")
  ?.split(".")
  .forEach((genre) => {
    initialGenreOption[Number(genre)] = true;
  });

const initailSortOption =
  (URLSearch.get("sort_by") as SortOptionType) || "popularity.desc";

export const useMovieFilterStore = create<MovieFilterState>((set, get) => ({
  sortOption: initailSortOption,
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
