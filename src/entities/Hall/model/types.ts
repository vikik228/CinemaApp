import type { HallMockData } from "@/shared/api/mock/types";

export interface HallStore {
    halls: HallMockData[];
    isLoading: boolean;
    fetchHalls: () => Promise<void>;
}