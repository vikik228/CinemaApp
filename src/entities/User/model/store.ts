import { create } from "zustand";
import {persist} from "zustand/middleware";
import type { AuthState } from "./types";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuth: false,

            login: (user, token) =>
                set({ user, token, isAuth: true }),
            logout: () =>
                set({ user: null, token: null, isAuth: false }),
        }),
        {
            name: 'cinema_auth',
        }
    )
)