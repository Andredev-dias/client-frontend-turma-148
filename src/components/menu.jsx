import { useNavigate } from "react-router";
import MenuImg from '../assets/menuIcon.png'
import styles from './menu.module.css'
import { useState } from "react";

import IconMenu from '../assets/icons8-circled-right.gif'

export const Menu = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)

    const goToUsers = () => navigate('/usersList')
    const goToDashboard = () => navigate('/dashboard')
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <nav className={open ? styles.navBar : styles.navBarClosed}>
            <img className={styles.menu} src={MenuImg} alt="Menu Icon" onClick={() => setOpen(prev => !prev)} />
            <div className={styles.wrapIconP}>
                <img className={styles.iconMenu} src={IconMenu} alt="Icon menu" />
                <p onClick={goToDashboard}>Dashboard</p>
            </div>
            <div className={styles.wrapIconP}>
                <img className={styles.iconMenu} src={IconMenu} alt="Icon menu" />
                <p>Criar usuario</p>
            </div>
            <div className={styles.wrapIconP}>
                <img className={styles.iconMenu} src={IconMenu} alt="Icon menu" />
                <p onClick={goToUsers}>Lista de usuarios</p>
            </div>
            <div className={styles.wrapIconP}>
                <img className={styles.iconMenu} src={IconMenu} alt="Icon menu" />
                <p>Criar produto</p>
            </div>
            <div className={styles.wrapIconP}>
                <img className={styles.iconMenu} src={IconMenu} alt="Icon menu" />
                <p>Lista de produtos</p>
            </div>
            <div className={styles.wrapIconP}>
                <img className={styles.iconMenu} src={IconMenu} alt="Icon menu" />
                <p onClick={logout}>Sair</p>
            </div>

        </nav>
    )
}