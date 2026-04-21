import React from 'react'
import "../style/Register.scss"
import { Link } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Register = () => {
  const {loading, handleRegister} = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister(formData.name, formData.email, formData.password)
    navigate('/login')
  }

  return (
   <main className="register-page">
    <div className="form-container">
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required placeholder='Enter your username' value={formData.name} onChange={handleChange}/>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required placeholder='Enter your email' value={formData.email} onChange={handleChange}/>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required placeholder='Enter your password' value={formData.password} onChange={handleChange}/>
      <button type="submit">Register</button>
    </form>
     <p>Already have an account? <Link to="/login">Login</Link></p>
     </div>
   </main>
  )
}

export default Register