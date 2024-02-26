export interface MovieInfo {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TrendMovieInfo extends MovieInfo {
  media_type: string;
}

export interface PopularMovieInfo extends MovieInfo {}

export interface TrendMovieResponse {
  page: number;
  results: TrendMovieInfo[];
  total_pages: number;
  total_results: number;
}

export interface PopularMovieResponse {
  page: number;
  results: PopularMovieInfo[];
  total_pages: number;
  total_results: number;
}

export interface TvInfo {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface PopularTvInfo extends TvInfo {}

export interface PopularTvResponse {
  page: number;
  results: PopularTvInfo[];
  total_pages: number;
  total_results: number;
}
