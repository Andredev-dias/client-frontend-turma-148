import './usersList.module.css'

import { useEffect, useState } from 'react'
import { api } from './api/api'

function UsersList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchUsers(){
      try {
        const response = await api.get('/users')
        setUsers(response.data)
        // console.log(response.data)
      } catch (err) {
          setError('Erro ao carregar usuarios', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])
  
  if (loading) return <p>Carregando usuarios...</p>
  if (error) return <p>{error}</p>

  return (
    <div style={{padding: '2rem'}}>
      <h1>Lista de usuarios</h1>
      <ol>
        {users.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - <i>{item.email}</i>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default UsersList