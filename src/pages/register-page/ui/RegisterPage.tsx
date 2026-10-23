import { Link } from "react-router";
import { Row, Col } from 'antd';
import {Navbar} from "@/widgets/Navbar";
import styles from "./RegisterPage.module.scss";
import {RegisterForm} from "@/features/register";


export function RegisterPage() {


    return(
        <div >
        <Navbar />
        <Row justify="center" align="middle" className={styles.mainStyle}>

            <Col xs={22} sm={14} md={12} lg={10} className={styles.cardMain}>

                <RegisterForm />
                <div><Link to="/login" className={styles.loginLink}>Уже есть аккаунт? Авторизоваться</Link></div>
            </Col>
        </Row>
        </div>
    )

}