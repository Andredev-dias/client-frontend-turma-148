import style from './App.module.css'
import { api } from './api/api'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react';

import Icon from './assets/icons8-circled-right.gif'
import IconLogin from './assets/icons8-crachá.gif'
import Eye from './assets/icons8-visível.gif'


function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)


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
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <img className={style.iconLogin} src={IconLogin} alt="Icone arrow" />
          <h2>Login</h2>
          </div>
          <div style={{position: "relative", width: "100%"}}>
            <img className={style.icon} src={Icon} alt="Icone arrow" />
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div style={{position: "relative", width: "100%"}}>
            <img className={style.icon} src={Icon} alt="Icone arrow" />
            <input type={showPassword ? 'text' : 'password'} placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <img onClick={() => setShowPassword(prev => !prev)} style={{position: "absolute", width: '20px', borderRadius: '100%', right: '10px', top: '10px', cursor: 'pointer'}} src={Eye} alt="Olho da senha" />
          </div>
          <button type='submit'>Entrar</button>
          <p className={style.userCad}>Entre em contato</p>
          <p>{message}</p>
        </form>
      </div>

    </div>
  )
}

export default App
