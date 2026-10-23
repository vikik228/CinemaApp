import { create } from "zustand";
import type { SeanceStore } from "./types";
import type { SeanceMockData } from "@/shared/api";

export const useSeanceStore = create<SeanceStore>((set, get) => ({
    seances: [] as SeanceMockData[],
    isLoading: false,
    selectedDateOffset: 0,
    selectedSeance: null,

    fetchSeances: async () => {
        if(get().seances.length > 0) return;
        set({ isLoading: true });
        try {
            const res= await fetch('/api/seances');
            const data = await res.json();
            set({ seances: data });
        } catch(err) {
            console.error(err);
        } finally {
            set({ isLoading: false });
        }
    },

    setSelectedDateOffset: (offset: number) => set({
        selectedDateOffset: offset,
        selectedSeance: null,
    }),

    setSelectedSeance: (seance: SeanceMockData | null) => set({
        selectedSeance: seance,
    })

}));