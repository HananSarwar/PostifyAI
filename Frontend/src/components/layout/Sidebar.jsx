import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'

const navItems = [
  { label: 'Dashboard', icon: '⊞', path: '/dashboard' },
  { label: 'AI Content', icon: '✦', path: '/ai-content' },
  { label: 'Design Editor', icon: '◈', path: '/design-editor' },
  { label: 'Schedule', icon: '◷', path: '/schedule' },
  { label: 'Analytics', icon: '◫', path: '/analytics' },
]

const manageItems = [
  { label: 'Team', icon: '◉', path: '/team' },
  { label: 'Brand Kit', icon: '❖', path: '/brand-kit' },
  { label: 'Connected', icon: '⌘', path: '/connected' },
  { label: 'Trends', icon: '↗', path: '/trends' },
  { label: 'Settings', icon: '⚙', path: '/settings' },
]

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 12px',
    borderRadius: '8px',
    color: isActive ? '#FFFFFF' : '#888888',
    background: isActive ? '#2A2A2A' : 'transparent',
    textDecoration: 'none',
    fontSize: '13px',
    marginBottom: '2px',
    transition: 'all 0.2s',
  })

  return (
    <div style={{
      width: '200px',
      background: '#141414',
      borderRight: '0.5px solid #2A2A2A',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '0.5px solid #2A2A2A' }}>
        <div style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF' }}>
          Postify AI
        </div>
        <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
          Social Media Manager
        </div>
      </div>

      {/* Nav items */}
      <div style={{ padding: '12px 8px', flex: 1, overflowY: 'auto' }}>
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} style={linkStyle}>
            <span style={{ fontSize: '15px' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        <div style={{
          fontSize: '10px',
          color: '#555',
          padding: '12px 10px 4px',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
        }}>
          Manage
        </div>

        {manageItems.map((item) => (
          <NavLink key={item.path} to={item.path} style={linkStyle}>
            <span style={{ fontSize: '15px' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* User avatar */}
      <div style={{
        padding: '12px 16px',
        borderTop: '0.5px solid #2A2A2A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: '#2A2A2A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: '600',
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ fontSize: '12px', color: '#FFFFFF' }}>
            {user?.name}
          </div>
        </div>
        <button onClick={handleLogout} style={{
          background: 'transparent',
          border: 'none',
          color: '#888',
          cursor: 'pointer',
          fontSize: '16px',
        }}>
          ⏻
        </button>
      </div>
    </div>
  )
}

export default Sidebar