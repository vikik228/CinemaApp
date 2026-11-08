import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/entities/User";
import styles from "./Navbar.module.scss";

const navItems = [
    { label: "Главная", path: "/" },
    { label: "Каталог", path: "/catalog" },
    { label: "События", path: "/events" },
];

export function Navbar() {

    const { isAuth, user, logout } = useAuthStore();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        setDrawerOpen(false);
    }, [pathname]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');

        const handleChange = () => {
            if (!mediaQuery.matches) {
                setDrawerOpen(false);
            }
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setDrawerOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logoLink}>
                <img className={styles.navLogo} src="/favico.png" alt="cinema logo" />
            </Link>

            <ul className={styles.navbarItem}>
                {navItems.map((item) => (
                    <li key={item.path}>
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                ))}
                <li>
                    {isAuth ? (
                        <div className={styles.buttonContainer}>
                            <span className={styles.username}>{user?.login}</span>
                            <button onClick={handleLogout} className={styles.logoutButton}>Выйти</button>
                        </div>
                    ) : (
                        <Link to="/login">Войти</Link>
                    )}
                </li>
            </ul>

            <button
                className={styles.burger}
                onClick={() => setDrawerOpen(true)}
                aria-label="Открыть меню"
                aria-expanded={drawerOpen}
            >
                <MenuOutlined />
            </button>

            <Drawer
                open={drawerOpen}
                placement="right"
                title="Меню"
                onClose={() => setDrawerOpen(false)}
                rootClassName={styles.drawer}
            >
                <ul className={styles.drawerList}>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link to={item.path} onClick={() => setDrawerOpen(false)}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        {isAuth ? (
                            <div className={styles.buttonContainer}>
                                <span className={styles.username}>{user?.login}</span>
                                <button onClick={handleLogout} className={styles.logoutButton}>Выйти</button>
                            </div>
                        ) : (
                            <Link to="/login" onClick={() => setDrawerOpen(false)}>Войти</Link>
                        )}
                    </li>
                </ul>
            </Drawer>
        </nav>
    );
}
