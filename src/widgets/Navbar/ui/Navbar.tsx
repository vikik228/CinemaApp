import { useAuthStore } from "@/entities/User";
import styles from './Navbar.module.scss'


export function Navbar() {

    const { isAuth, user, logout } = useAuthStore();

    return (
        <nav className={styles.navbar}>
            <a href="/" className={styles.logoLink}>
                <img className={styles.navLogo} src="/favico.png" alt="cinema logo"  />
            </a>
            <ul className={styles.navbarItem}>

                <li><a href="/">Главная</a></li>
                <li><a href="/catalog">Каталог</a></li>
                <li><a href="/events">События</a></li>
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
                    <a href="/login">Войти</a>
                }
                </li>

            </ul>
        </nav>
    )
}

