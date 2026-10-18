import { useState } from "react";
import { message } from "antd";
import { loginUser } from "@/features/login/api/loginUser";
import type { LoginFormValues } from "@/features/login/model/types";
import {useAuthStore} from "@/entities/User";

export function useLogin(onSuccess?: () => void) {
    const login = useAuthStore((state) => state.login);
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const submit = async (values: LoginFormValues) => {
        setIsLoading(true);
        try {
            const result = await loginUser(values);
            if (result.ok) {
                login(result.user, result.token);
                messageApi.success({ content: "Успешная авторизация!", duration: 2});
                onSuccess?.();
            } else {
                messageApi.error({ content: result.message, duration: 3 });
            }

        } finally {
            setIsLoading(false);
        }
    };
    return { submit, isLoading, contextHolder };
}