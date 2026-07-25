import { useSelector } from 'react-redux'

const TopBar = ({ title }) => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div style={{
      height: '56px',
      background: '#141414',
      borderBottom: '0.5px solid #2A2A2A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'fixed',
      top: 0,
      left: '200px',
      right: 0,
      zIndex: 99,
    }}>
      <div style={{ fontSize: '15px', fontWeight: '500', color: '#FFFFFF' }}>
        {title || `Good morning, ${user?.name?.split(' ')[0]} 👋`}
      </div>
      <button style={{
        background: '#FFFFFF',
        color: '#000000',
        border: 'none',
        padding: '7px 16px',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      }}>
        + New Post
      </button>
    </div>
  )
}

export default TopBar