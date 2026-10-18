import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useLogin } from "@/features/login/model/useLogin.ts";
import {useNavigate} from "react-router";
import styles from './LoginForm.module.scss';

interface LoginFormProps {
    onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const {submit, isLoading, contextHolder} = useLogin(() => {
        form.resetFields();
        onSuccess?.();
        setTimeout(() => {
            navigate('/');
        }, 2000);
    });
    return (
        <>
            {contextHolder}
            <Form
                form={form}
                name="loginForm"
                layout="vertical"
                requiredMark={false}
                onFinish={submit}
                autoComplete="off"
                className={styles.FormSet}
            >
                <Form.Item
                    label="Почта"
                    name="email"
                    rules={[
                        {required: true, message: 'Введите почту!'},
                        {type: 'email', message: 'Введите корректную почту'},
                    ]}
                >
                    <Input
                        prefix={<MailOutlined/>}
                        type="email"
                        placeholder="Почта"
                        className={styles.formInput}/>
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {required: true, message: 'Введите Пароль!'},
                    ]}
                >
                    <Input
                        prefix={<LockOutlined/>}
                        type="password"
                        className={styles.formInput}
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={isLoading}
                        className={styles.submitButton}
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

