import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginStart, loginSuccess, loginFail } from '../../redux/slices/authSlice'
import { signupAPI } from '../../services/authService'

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loginStart())
    try {
      const data = await signupAPI(form)
      dispatch(loginSuccess(data))
      navigate('/dashboard')
    } catch (err) {
      dispatch(loginFail(err.response?.data?.message || 'Signup failed'))
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0F0F0F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#1A1A1A',
        border: '0.5px solid #2A2A2A',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '22px', fontWeight: '600', color: '#FFFFFF' }}>
            Postify AI
          </div>
          <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
            Create your account
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#2e1a1a',
            color: '#F44336',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            marginBottom: '16px',
            border: '0.5px solid #F44336',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '6px' }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Hanan Sarwar"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                background: '#222222',
                border: '0.5px solid #2A2A2A',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '13px',
                color: '#FFFFFF',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="hanan@example.com"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                background: '#222222',
                border: '0.5px solid #2A2A2A',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '13px',
                color: '#FFFFFF',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                background: '#222222',
                border: '0.5px solid #2A2A2A',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '13px',
                color: '#FFFFFF',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#FFFFFF',
              color: '#000000',
              border: 'none',
              borderRadius: '8px',
              padding: '11px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '4px',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Login link */}
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#888', marginTop: '20px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: '500' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup