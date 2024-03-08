import { create } from "zustand";

export type SortOptionType = "vote_high" | "vote_low" | "date_rec" | "date_old";

export interface FavorFilterState {
  sortOption: SortOptionType;
  setSortOption: (option: SortOptionType) => void;
}

export const useFavorFilterStore = create<FavorFilterState>((set, get) => ({
  sortOption: "date_rec",
  setSortOption: (option) => {
    set({ sortOption: option });
  },
}));
