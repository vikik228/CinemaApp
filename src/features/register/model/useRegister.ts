import { useState } from "react";
import { message } from "antd";
import { registerUser } from "@/features/register/api/registerUser.ts";
import type { RegisterFormValues } from "@/features/register/model/types.ts";

export function useRegister(onSuccess?: () => void) {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const submit = async (values: RegisterFormValues) => {
        setIsLoading(true);
        try {
            const result = await registerUser(values);
            if (result.ok) {
                messageApi.success({content: "Успешная регистрация!", duration: 3});
                onSuccess?.();
            } else {
                messageApi.error({content: result.message, duration: 3});
            }

        } finally {
            setIsLoading(false);
        }
    };
    return { submit, isLoading, contextHolder, };
}