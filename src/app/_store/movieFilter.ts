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
  setGenreOption: (option: number) => void;
  resetGenre: () => void;
}

export const initialGenreOption = {
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

export const useMovieFilterStore = create<MovieFilterState>((set, get) => ({
  sortOption: "popularity.desc",
  genreOption: initialGenreOption,
  setSortOption: (option) => {
    set({ sortOption: option });
  },
  setGenreOption: (option) => {
    set({
      genreOption: {
        ...get().genreOption,
        [option]: !get().genreOption[option],
      },
    });
  },
  resetGenre: () => {
    set({
      genreOption: initialGenreOption,
    });
  },
}));
