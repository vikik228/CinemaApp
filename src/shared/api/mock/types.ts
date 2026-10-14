export interface MovieMockData {
    id: number;
    title: string;
    poster: string;
    description?: string;
    rating: number;
}

export interface HallMockData {
    id: number;
    name: string;
    totalSeats: number;
}

export interface SeanceMockData {
    id: number;
    movieId: number;
    hallId: number;
    daysOffset: number;
    time: string;
    price: number;
}