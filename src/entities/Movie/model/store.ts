import { create } from 'zustand';
import type { MovieStore } from "./types";

export const useMovieStore = create<MovieStore>((set, get) => ({
    movies: [],
    isLoading: false,
    fetchMovies: async () => {
        if (get().movies.length > 0) return;
        set({ isLoading: true });
        try {
            const res = await fetch('/api/movies');
            const data = await res.json();
            set({ movies: data });
        } catch (err) {
            console.error(err);
        } finally {
            set({ isLoading: false });
        }
    }
}))