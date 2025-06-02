import style from './App.module.css'
import { api } from './api/api'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      navigate('/dashboard')
    }
  }, [navigate])



  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/login', { email, password })
      const user = response.data

      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      navigate('/dashboard')
    } catch (error) {
      setMessage('Erro no login: ' + (error.response?.data?.message || 'Verifique os dados'))
    }
  }

  return (
    <div className={style.wrapLogin}>

      <div className={style.wrapImg}>
        <div className={style.degrade}></div>
      </div>
      <div className={style.wrapForm}>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type='submit'>Entrar</button>
          <p className={style.userCad}>Entre em contato</p>
          <p>{message}</p>
        </form>
      </div>

    </div>
  )
}

export default App
