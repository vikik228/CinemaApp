import type { LoginResult, LoginFormValues } from "@/features/login/model/types";

export async function loginUser(values: LoginFormValues): Promise<LoginResult> {
    try {
        const response = await fetch('/login', {
            method: "POST",
            headers: {"Content-type": "application/json",},
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            return {ok: false, message: errorData.message || 'Неверный логин или пароль!'};
        }

        const data = await response.json();
        return { ok: true, token: data.token, user: data.user };
    } catch (err) {
        return { ok: false, message: 'Ошибка соединения!' };
    }
}