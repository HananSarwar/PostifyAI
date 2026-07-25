const actions = [
  { label: 'Generate caption', icon: '✦' },
  { label: 'Schedule post', icon: '◷' },
  { label: 'View analytics', icon: '◫' },
]

const QuickActions = () => {
  return (
    <div style={{
      background: '#1A1A1A',
      border: '0.5px solid #2A2A2A',
      borderRadius: '10px',
      padding: '16px',
    }}>
      <div style={{ fontSize: '13px', fontWeight: '500', color: '#FFFFFF', marginBottom: '12px' }}>
        ⚡ Quick actions
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {actions.map((a) => (
          <button key={a.label} style={{
            background: '#222222',
            border: '0.5px solid #2A2A2A',
            borderRadius: '8px',
            padding: '12px 8px',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#2A2A2A'}
            onMouseLeave={e => e.currentTarget.style.background = '#222222'}
          >
            <div style={{ fontSize: '20px', color: '#FFFFFF', marginBottom: '4px' }}>{a.icon}</div>
            <div style={{ fontSize: '11px', color: '#888' }}>{a.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions