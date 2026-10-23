import { create } from "zustand";
import type { HallMockData } from "@/shared/api";
import type { HallStore } from "./types";


export const useHallStore = create<HallStore>((set, get) => ({

    halls: [] as HallMockData[],
    isLoading: false,


    fetchHalls: async () => {
        if(get().halls.length > 0) return;
        set( { isLoading: false })
        try {
            const res = await fetch('/api/halls');
            const data = await res.json();
            set({ halls: data });
        } catch (err) {
            console.error(err);
        } finally {
            set({ isLoading: false });
        }
    }

}))

