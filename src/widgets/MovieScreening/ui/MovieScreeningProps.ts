import type { MovieMockData } from "@/entities/Movie";

export interface MovieScreeningProps {
    movies: MovieMockData[];
}

export interface MovieSeances {
    movieId: number;
}