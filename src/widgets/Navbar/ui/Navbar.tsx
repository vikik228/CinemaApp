import { useState } from "react";
import { Link } from "react-router";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/entities/User";
import styles from "./Navbar.module.scss";

const navItems = [
    { label: "Главная", path: "/" },
    { label: "Каталог", path: "/catalog" },
    { label: "События", path: "/events" },
];

export function Navbar() {
    const { isAuth, user, logout } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = () => {
        logout();
        closeMenu();
    };

    const authContent = isAuth ? (
        <div className={styles.auth}>
            <span className={styles.username}>{user?.login}</span>
            <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                Выйти
            </button>
        </div>
    ) : (
        <Link className={styles.navLink} to="/login" onClick={closeMenu}>
            Войти
        </Link>
    );

    const navLinks = navItems.map((item) => (
        <li key={item.path}>
            <Link className={styles.navLink} to={item.path} onClick={closeMenu}>
                {item.label}
            </Link>
        </li>
    ));

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logoLink} onClick={closeMenu}>
                <img className={styles.navLogo} src="/favico.png" alt="cinema logo" />
            </Link>

            <ul className={styles.navList}>
                {navLinks}
                <li>{authContent}</li>
            </ul>

            <button
                type="button"
                className={styles.burger}
                onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isMenuOpen}
                aria-controls="navbar-menu"
            >
                {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>

            <div
                id="navbar-menu"
                className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
                inert={!isMenuOpen}
            >
                <button
                    type="button"
                    className={styles.mobileMenuBackdrop}
                    onClick={closeMenu}
                    aria-label="Закрыть меню"
                    tabIndex={-1}
                />

                <div className={styles.mobileMenuPanel}>
                    <div className={styles.mobileMenuHeader}>
                        <span>Меню</span>
                        <button
                            type="button"
                            className={styles.mobileMenuClose}
                            onClick={closeMenu}
                            aria-label="Закрыть меню"
                        >
                            <CloseOutlined />
                        </button>
                    </div>

                    <ul className={styles.mobileMenuList}>
                        {navLinks}
                        <li>{authContent}</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
