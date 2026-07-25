const posts = [
  { id: 1, title: 'Summer sale announcement', time: 'Today, 3:00 PM', platform: 'Instagram', status: 'Scheduled' },
  { id: 2, title: 'Product demo reel', time: 'Tomorrow, 10:00 AM', platform: 'Facebook', status: 'Scheduled' },
  { id: 3, title: 'Industry insight article', time: 'Draft · LinkedIn', platform: 'LinkedIn', status: 'Draft' },
  { id: 4, title: 'Customer testimonial post', time: 'May 10, 9:00 AM', platform: 'All platforms', status: 'Published' },
]

const statusStyle = (status) => {
  if (status === 'Scheduled') return { background: '#1a1a2e', color: '#7f77dd' }
  if (status === 'Published') return { background: '#1a2e1a', color: '#4CAF50' }
  if (status === 'Draft') return { background: '#2A2A2A', color: '#888' }
}

const UpcomingPosts = () => {
  return (
    <div style={{
      background: '#1A1A1A',
      border: '0.5px solid #2A2A2A',
      borderRadius: '10px',
      padding: '16px',
    }}>
      <div style={{ fontSize: '13px', fontWeight: '500', color: '#FFFFFF', marginBottom: '12px' }}>
        ◷ Upcoming posts
      </div>
      {posts.map((post, i) => (
        <div key={post.id} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 0',
          borderBottom: i !== posts.length - 1 ? '0.5px solid #2A2A2A' : 'none',
        }}>
          <div style={{
            width: '34px', height: '34px',
            borderRadius: '6px',
            background: '#2A2A2A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#888', fontSize: '14px', flexShrink: 0,
          }}>
            ◫
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '12px', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {post.title}
            </div>
            <div style={{ fontSize: '11px', color: '#888' }}>
              {post.time} · {post.platform}
            </div>
          </div>
          <span style={{
            fontSize: '10px',
            padding: '2px 8px',
            borderRadius: '20px',
            fontWeight: '500',
            ...statusStyle(post.status),
          }}>
            {post.status}
          </span>
        </div>
      ))}
    </div>
  )
}

export default UpcomingPosts