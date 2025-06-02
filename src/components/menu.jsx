import { useNavigate } from "react-router";
import MenuImg from '../assets/menuIcon.png'
import styles from './menu.module.css'
import { useState } from "react";

export const Menu = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)

    const goToUsers = () => navigate('/usersList')
    const goToDashboard = () => navigate('/dashboard')
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return(
        <nav className={open ? styles.navBar : styles.navBarClosed}>
            <img src={MenuImg} alt="Menu Icon" onClick={() => setOpen(prev => !prev)}/>
            <p onClick={goToDashboard}>Dashboard</p>
            <p>Criar usuario</p>
            <p onClick={goToUsers}>Lista de usuarios</p>
            <p>Criar produto</p>
            <p>Lista de produtos</p>
            <p onClick={logout}>Sair</p>
        </nav>
    )
}