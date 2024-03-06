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
