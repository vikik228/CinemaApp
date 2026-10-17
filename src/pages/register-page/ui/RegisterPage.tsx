import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from "react";
import styles from "./RegisterPage.module.scss";
import {Navbar} from "@/widgets/Navbar";

export function RegisterPage() {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    login: values.username,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                const serverMessage = errorData.message || '';

                if (serverMessage.toLowerCase().includes('почтой')) {
                    messageApi.open({
                        type: 'error',
                        content: 'Ошибка: Пользователь с такой почтой уже существует!',
                        duration: 3,
                    });
                } else if (serverMessage.toLowerCase().includes('логином')) {
                    messageApi.open({
                        type: 'error',
                        content: 'Ошибка: Пользователь с таким логином уже существует!',
                        duration: 3,
                    });
                } else {
                    messageApi.open({
                        type: 'error',
                        content: serverMessage || 'Ошибка при регистрации',
                        duration: 3,
                    });
                }
                return;
            }
            const data = await response.json();
            console.log('Данные с сервера', data);
            messageApi.open({
                type: 'success',
                content: 'Регистрация успешна',
                duration: 3,
            });
            form.resetFields();
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: "Ошибка соединения, попробуйте позже!",
                duration: 3,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div>
        <Navbar />
        <Row justify="center" align="middle" className={styles.mainStyle}>

            <Col xs={22} sm={14} md={12} lg={10} className={styles.cardMain}>
                {contextHolder}
                <Form
                form={form}
                name="registerPage"
                layout="vertical"
                requiredMark={false}
                onFinish={onFinish}
                autoComplete="off"
                className={styles.FormSet}
                >
                    <Form.Item
                    label="Логин"
                    name="username"
                    rules={[{
                        required: true,
                        message: "Введите логин!",
                    }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Логин" className={styles.formInput} />
                    </Form.Item>
                    <Form.Item
                    label="Почта"
                    name="email"
                    rules = {[{
                        required: true,
                        message: "Введите почту!",
                    },
                        {
                            type: 'email',
                            message: "Введите корректную почту!",
                        },
                    ]}
                    >
                        <Input prefix={<MailOutlined />} type="email" placeholder="Почта" className={styles.formInput} />
                    </Form.Item>
                    <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{
                        required: true,
                        message: "Введите пароль!",

                    },
                        {
                            min: 8,
                            message: "Пароль должен содержать больше 8 символов!",
                        }
                    ]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" className={styles.formInput} />
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
                <div><a href="/login" className={styles.loginLink}>Уже есть аккаунт? Авторизоваться</a></div>
            </Col>
        </Row>
        </div>
    )

}