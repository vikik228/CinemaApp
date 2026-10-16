import styles from './Navbar.module.scss'

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <a href="/" className={styles.logoLink}>
                <img className={styles.navLogo} src="/favico.png" alt="cinema logo"  />
            </a>
            <ul className={styles.navbarItem}>

                <li><a href="/">Главная</a></li>
                <li><a href="">Каталог</a></li>
                <li><a href="/events">События</a></li>

                <li><a href="">Войти</a></li>

            </ul>
        </nav>
    )
}

