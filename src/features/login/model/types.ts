export interface LoginFormValues {
    email: string;
    password: string;
}

import type { AuthUser } from '@/entities/User';

export type LoginResult =
    | { ok: true; token: string; user: AuthUser; message?: undefined }
    | { ok: false; message: string }

