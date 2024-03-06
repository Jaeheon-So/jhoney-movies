export interface ListResults {
  account_object_id: string;
  adult: number;
  average_rating: number;
  backdrop_path: string | null;
  created_at: string;
  description: string;
  featured: number;
  id: number;
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  number_of_items: number;
  poster_path: string | null;
  public: number;
  revenue: number;
  runtime: number;
  sort_by: number;
  updated_at: string;
}

export interface ListResponse {
  page: number;
  results: ListResults[];
  total_pages: number;
  total_results: number;
}

export interface DetailMovieResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  runtime: number;
  revenue: number;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface DetailTvResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  runtime: number;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface ListDetailResponse {
  average_rating: number;
  backdrop_path: string | null;
  results: (DetailMovieResult | DetailTvResult)[];
  created_by: {
    avatar_path: string | null;
    gravatar_hash: string;
    id: string;
    name: string;
    username: string;
  };
  description: string;
  id: number;
  iso_3166_1: string;
  iso_639_1: string;
  item_count: number;
  name: string;
  object_ids: any;
  page: number;
  poster_path: string | null;
  public: boolean;
  revenue: number;
  runtime: number;
  sort_by: string;
  total_pages: number;
  total_results: number;
}
