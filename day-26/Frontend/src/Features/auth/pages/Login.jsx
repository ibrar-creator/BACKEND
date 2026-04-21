import React,{useState} from 'react'
import "../style/Login.scss"

import { Link } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {
  const {loading, handleLogin} = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  async function handleSubmit(e){
    e.preventDefault()
   await handleLogin(email, password)
    navigate("/")
  }

  return (
   <main className="login-page">
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button type="submit" disabled={loading}>Login</button>
    </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
   </main>

  )
}

export default Login