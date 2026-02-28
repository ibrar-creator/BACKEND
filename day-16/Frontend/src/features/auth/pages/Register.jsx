import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import '../style/form.scss'
import { useAuth } from '../../hooks/useAuth'

const Register = () => {
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [error, setError] = useState('')

  const { handleRegister, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return <h1>Loading...</h1>
  }

  async function handlesubmit(e) {
    e.preventDefault()
    setError('')

    try {
      await handleRegister(username, email, password)
      navigate('/login')
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Registration failed'
      setError(errorMsg)
    }
  }

  return (
    <main>
      <div className="form-container">
        <h2>Register</h2>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <form onSubmit={handlesubmit}>
          <input 
            type="text" 
            name='username' 
            placeholder='Enter your username' 
            value={username} 
            onChange={(e) => setusername(e.target.value)} 
          />
          <input 
            type="email" 
            name='email' 
            placeholder='Enter your email' 
            value={email} 
            onChange={(e) => setemail(e.target.value)} 
          />
          <input 
            type="password" 
            name='password' 
            placeholder='Enter your password' 
            value={password} 
            onChange={(e) => setpassword(e.target.value)} 
          />
          <button type='submit'>Register</button>
        </form>
        <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register