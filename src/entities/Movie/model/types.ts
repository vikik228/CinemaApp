import type { MovieMockData } from "@/shared/api";


export interface MovieStore {
    movies: MovieMockData[];
    isLoading: boolean;
    fetchMovies: () => void;
}
