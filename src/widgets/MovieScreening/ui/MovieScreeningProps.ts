import type { MovieMockData } from "@/shared/api/mock/types.ts";

export interface MovieScreeningProps {
    movies: MovieMockData[];
}

export interface MovieSeances {
    movieId: number;
}