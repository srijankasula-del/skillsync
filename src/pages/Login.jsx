import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()

    const userData = {
      name,
      email,
    }

    localStorage.setItem(
      'user',
      JSON.stringify(userData)
    )

    navigate('/dashboard')
  }

  return (
    <div className="login-page">
      <form
        className="login-form"
        onSubmit={handleLogin}
      >
        <h1>Welcome Back</h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login