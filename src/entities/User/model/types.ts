export interface User {
    id: number;
    login: string;
    email: string;
    password: string;
}

export type AuthUser = Pick<User, 'id' | 'login' | 'email'>

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuth: boolean;
    login: (user: AuthUser, token: string) => void;
    logout: () => void;
}