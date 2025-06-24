export interface Movie {
  id: string;
  title: string;
  year: number;
  runtimeMinutes: number | null;
  genres: string[];
  director: {
    imdbId: string;
    name: string;
  };
  role: Role[];
}

export interface Role {
  ordering: number;
  imdbId: string;
  name: string;
  characters: string[];
}

export interface MovieListResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Movie[];
}