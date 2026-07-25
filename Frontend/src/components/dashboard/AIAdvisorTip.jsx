const AIAdvisorTip = () => {
  return (
    <div style={{
      background: '#1A1A1A',
      border: '0.5px solid #2A2A2A',
      borderRadius: '10px',
      padding: '16px',
      marginTop: '12px',
    }}>
      <div style={{ fontSize: '13px', fontWeight: '500', color: '#FFFFFF', marginBottom: '8px' }}>
        ✦ AI advisor tip
      </div>
      <div style={{
        background: '#222222',
        border: '0.5px solid #2A2A2A',
        borderRadius: '8px',
        padding: '10px 12px',
        fontSize: '12px',
        color: '#888',
        lineHeight: '1.6',
      }}>
        Post reels on Instagram between <span style={{ color: '#FFFFFF' }}>6–8 PM</span> for{' '}
        <span style={{ color: '#FFFFFF' }}>34% higher engagement</span> based on your last 30 days.
      </div>
    </div>
  )
}

export default AIAdvisorTip