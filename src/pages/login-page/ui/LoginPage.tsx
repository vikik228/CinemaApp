import { Link } from "react-router";
import { Row, Col } from 'antd';
import { Navbar } from "@/widgets/Navbar";
import { LoginForm } from "@/features/login";
import styles from "./LoginPage.module.scss";

export function LoginPage() {


    return(
        <div >
            <Navbar />
            <Row justify="center" align="middle" className={styles.mainStyle}>

                <Col xs={22} sm={14} md={12} lg={10} className={styles.cardMain}>

                    <LoginForm />
                    <div><Link to="/register" className={styles.loginLink}>Нет аккаунта? Зарегестрироваться</Link></div>
                </Col>
            </Row>
        </div>
    )

}