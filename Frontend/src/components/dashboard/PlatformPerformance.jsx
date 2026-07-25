const platforms = [
  { name: 'Facebook', pct: 78, color: '#4267B2' },
  { name: 'Instagram', pct: 62, color: '#C13584' },
  { name: 'LinkedIn', pct: 45, color: '#0077B5' },
]

const PlatformPerformance = () => {
  return (
    <div style={{
      background: '#1A1A1A',
      border: '0.5px solid #2A2A2A',
      borderRadius: '10px',
      padding: '16px',
    }}>
      <div style={{ fontSize: '13px', fontWeight: '500', color: '#FFFFFF', marginBottom: '12px' }}>
        ◫ Platform performance
      </div>
      {platforms.map((p, i) => (
        <div key={p.name} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '7px 0',
          borderBottom: i !== platforms.length - 1 ? '0.5px solid #2A2A2A' : 'none',
        }}>
          <div style={{ fontSize: '12px', color: '#FFFFFF', minWidth: '72px' }}>
            {p.name}
          </div>
          <div style={{ flex: 1, height: '5px', background: '#2A2A2A', borderRadius: '3px' }}>
            <div style={{ width: `${p.pct}%`, height: '5px', background: p.color, borderRadius: '3px' }} />
          </div>
          <div style={{ fontSize: '11px', color: '#888', minWidth: '28px', textAlign: 'right' }}>
            {p.pct}%
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlatformPerformance