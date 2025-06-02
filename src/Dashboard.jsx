import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Menu } from "./components/menu";
import { api } from "./api/api";
import styles from './Dashboard.module.css'

function Dashboard() {
    const navigate = useNavigate()
    const [userCount, setUserCount] = useState(0)
    const [productCount, setProductCount] = useState(0)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) navigate('/')
    }, [navigate])

    useEffect(() => {
        async function fetchData() {
            try {
                const [usersRes, productsRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/list'),
                    ])
                setUserCount(usersRes.data.length)
                setProductCount(productsRes.data.length)
            } catch (err) {
                console.error("Erro ao buscar dados do dashboard", err)
            }
        }
        fetchData()
    }, [])


    return (
        <section>
            <Menu />
            <div className={styles.wrapNav}>
                <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                    <p>Criar produto</p>
                </div>
                <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                    <p>Lista de produtos - ({productCount} produtos)</p>
                </div>
                <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                    <p>Criar usuario</p>
                </div>
                <div className={styles.wrapItem} onClick={() => navigate('/usersList')}>
                    <p>Lista de usuarios - ({userCount} usuarios)</p>
                </div>
            </div>
        </section>
    )
}

export default Dashboard