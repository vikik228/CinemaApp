import type { HallMockData } from "@/shared/api";

export interface HallStore {
    halls: HallMockData[];
    isLoading: boolean;
    fetchHalls: () => Promise<void>;
}