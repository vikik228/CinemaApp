import { Row, Col } from 'antd';
import {Navbar} from "@/widgets/Navbar";
import styles from "./RegisterPage.module.scss";
import {RegisterForm} from "@/features/register/ui/RegisterForm.tsx";


export function RegisterPage() {


    return(
        <div >
        <Navbar />
        <Row justify="center" align="middle" className={styles.mainStyle}>

            <Col xs={22} sm={14} md={12} lg={10} className={styles.cardMain}>

                <RegisterForm />
                <div><a href="/login" className={styles.loginLink}>Уже есть аккаунт? Авторизоваться</a></div>
            </Col>
        </Row>
        </div>
    )

}