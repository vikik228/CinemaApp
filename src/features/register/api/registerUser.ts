import type { RegisterFormValues} from "@/features/register/model/types";
import type { RegisterResult } from "@/features/register/model/types";

export async function registerUser(values: RegisterFormValues): Promise<RegisterResult> {
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
                login: values.username,
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            const serverMessage = errorData.message || '';
            const lower = serverMessage.toLowerCase();

            if (lower.includes('почтой')) {
                return { ok: false, message: 'Пользователь с такой почтой уже существует!'};
            }
            if (lower.includes('логином')) {
                return { ok: false, message: 'Пользователь с таким логином уже существует' };
            }
            return {ok: false, message: 'Ошибка соединения!'};
        }
        return {ok: true};
    } catch (err) {
        return {ok: false, message: "Ошибка соединения!"};
    }

}