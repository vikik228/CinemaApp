import type { MovieMockData } from "@/shared/api/mock/types";


export interface MovieStore {
    movies: MovieMockData[];
    isLoading: boolean;
    fetchMovies: () => void;
}
