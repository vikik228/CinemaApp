import { Link } from "react-router";
import { useAuthStore } from "@/entities/User";
import styles from './Navbar.module.scss'


export function Navbar() {

    const { isAuth, user, logout } = useAuthStore();

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logoLink}>
                <img className={styles.navLogo} src="/favico.png" alt="cinema logo"  />
            </Link>
            <ul className={styles.navbarItem}>

                <li><Link to="/">Главная</Link></li>
                <li><Link to="/catalog">Каталог</Link></li>
                <li><Link to="/events">События</Link></li>
                <li>{isAuth ? (
                    <>
                        <div className={styles.buttonContainer}>
                            <span>
                                <div className={styles.username}>{user?.login}</div>
                            </span>
                            <button onClick={logout} className={styles.logoutButton}>Выйти</button>
                        </div>
                    </>

                ) :
                    <Link to="/login">Войти</Link>
                }
                </li>

            </ul>
        </nav>
    )
}

