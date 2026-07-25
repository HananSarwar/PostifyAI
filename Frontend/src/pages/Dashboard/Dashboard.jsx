import Sidebar from '../../components/layout/Sidebar'
import TopBar from '../../components/layout/TopBar'
import MetricCard from '../../components/dashboard/MetricCard'
import UpcomingPosts from '../../components/dashboard/UpcomingPosts'
import PlatformPerformance from '../../components/dashboard/PlatformPerformance'
import AIAdvisorTip from '../../components/dashboard/AIAdvisorTip'
import QuickActions from '../../components/dashboard/QuickActions'

const metrics = [
  { label: 'Total reach', value: '48.2K', delta: '12% this week', deltaType: 'up' },
  { label: 'Engagement rate', value: '6.4%', delta: '2.1% vs last', deltaType: 'up' },
  { label: 'Posts published', value: '34', delta: 'This month', deltaType: 'neutral' },
  { label: 'Scheduled', value: '8', delta: 'Upcoming posts', deltaType: 'neutral' },
]

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', background: '#0F0F0F', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', flex: 1 }}>
        <TopBar />
        <div style={{ padding: '80px 24px 24px' }}>

          {/* Metric Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            marginBottom: '16px',
          }}>
            {metrics.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>

          {/* Row 2 — Upcoming posts + Platform performance */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '12px',
          }}>
            <UpcomingPosts />
            <div>
              <PlatformPerformance />
              <AIAdvisorTip />
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>
    </div>
  )
}

export default Dashboard