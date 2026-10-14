import type { SeanceMockData } from "@/shared/api/mock/types";

export interface SeanceStore {
    seances: SeanceMockData[];
    isLoading: boolean;
    selectedDateOffset: number;
    selectedSeance: SeanceMockData | null;
    fetchSeances: () => Promise<void>;
    setSelectedDateOffset (offset: number): void;
    setSelectedSeance (seance: SeanceMockData | null): void;
}