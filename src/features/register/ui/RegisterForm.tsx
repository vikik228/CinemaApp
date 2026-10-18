import { Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useRegister } from '../model/useRegister';
import styles from './RegisterForm.module.scss';

interface RegisterFormProps {
    onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
    const [form] = Form.useForm();
    const { submit, isLoading, contextHolder } = useRegister(() => {
        form.resetFields();
        onSuccess?.();
    });

    return (
        <>
            {contextHolder}
            <Form
                form={form}
                name="registerPage"
                layout="vertical"
                requiredMark={false}
                onFinish={submit}
                autoComplete="off"
                className={styles.FormSet}
            >
                <Form.Item
                    label="Логин"
                    name="username"
                    rules={[{ required: true, message: "Введите логин!" }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Логин" className={styles.formInput} maxLength={15} />
                </Form.Item>

                <Form.Item
                    label="Почта"
                    name="email"
                    rules={[
                        { required: true, message: "Введите почту!" },
                        { type: 'email', message: "Введите корректную почту!" },
                    ]}
                >
                    <Input prefix={<MailOutlined />} type="email" placeholder="Почта" className={styles.formInput} maxLength={50} />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        { required: true, message: "Введите пароль!" },
                        { min: 8, message: "Пароль должен содержать больше 8 символов!" },
                    ]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" className={styles.formInput} maxLength={30} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={isLoading}
                        className={styles.submitButton}
                    >
                        Зарегестрироваться
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}