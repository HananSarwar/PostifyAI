const MetricCard = ({ label, value, delta, deltaType }) => {
  return (
    <div style={{
      background: '#1A1A1A',
      border: '0.5px solid #2A2A2A',
      borderRadius: '10px',
      padding: '16px',
    }}>
      <div style={{ fontSize: '11px', color: '#888', marginBottom: '6px' }}>
        {label}
      </div>
      <div style={{ fontSize: '22px', fontWeight: '600', color: '#FFFFFF' }}>
        {value}
      </div>
      {delta && (
        <div style={{
          fontSize: '11px',
          marginTop: '4px',
          color: deltaType === 'up' ? '#4CAF50' : deltaType === 'down' ? '#F44336' : '#888',
        }}>
          {deltaType === 'up' ? '↑' : deltaType === 'down' ? '↓' : ''} {delta}
        </div>
      )}
    </div>
  )
}

export default MetricCard