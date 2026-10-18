export interface RegisterFormValues {
    username: string;
    password: string;
    email: string;
}

export type RegisterResult =
| { ok: true; message?: undefined }
| { ok: false; message: string };