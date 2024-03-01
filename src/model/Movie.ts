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
export interface TopRatedMovieInfo extends MovieInfo {}
export interface UpComingMovieInfo extends MovieInfo {}
export interface NowPlayingMovieInfo extends MovieInfo {}

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

export interface TopRatedMovieResponse {
  page: number;
  results: TopRatedMovieInfo[];
  total_pages: number;
  total_results: number;
}

export interface UpComingMovieResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: UpComingMovieInfo[];
  total_pages: number;
  total_results: number;
}

export interface NowPlayingMovieResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: NowPlayingMovieInfo[];
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
export interface OnAirTvInfo extends TvInfo {}
export interface TopRatedTvInfo extends TvInfo {}

export interface PopularTvResponse {
  page: number;
  results: PopularTvInfo[];
  total_pages: number;
  total_results: number;
}

export interface OnAirTvResponse {
  page: number;
  results: OnAirTvInfo[];
  total_pages: number;
  total_results: number;
}

export interface TopRatedTvResponse {
  page: number;
  results: TopRatedTvInfo[];
  total_pages: number;
  total_results: number;
}

export interface MovieVideoInfo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface TvVideoInfo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface MovieTrailerResponse {
  id: number;
  results: MovieVideoInfo[];
}

export interface TvTrailerResponse {
  id: number;
  results: TvVideoInfo[];
}

export interface MovieDetailResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
