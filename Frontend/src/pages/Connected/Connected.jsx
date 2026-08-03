import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar'
import TopBar from '../../components/layout/TopBar'
import { getConnectedAccounts, connectLinkedIn, disconnectAccount } from '../../services/socialService'
import { PLATFORMS } from '../../assets/icons.jsx'

const Connected = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const platform = params.get('platform')
    const status = params.get('status')
    if (platform && status) {
      setMsg(status === 'success'
        ? `${platform} connected successfully!`
        : `Failed to connect ${platform}. Try again.`)
    }
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      const data = await getConnectedAccounts()
      setAccounts(data.accounts)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnect = async (platform) => {
    try {
      await disconnectAccount(platform)
      setAccounts((prev) => prev.filter((a) => a.platform !== platform))
      setMsg(`${platform} disconnected successfully!`)
    } catch (err) {
      console.error(err)
    }
  }

  const handleConnect = (platform) => {
    if (platform === 'linkedin') connectLinkedIn()
  }

  const isConnected = (platform) => accounts.some((a) => a.platform === platform)

  return (
    <div style={{ display: 'flex', background: '#0F0F0F', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', flex: 1 }}>
        <TopBar title="Connected Accounts" />
        <div style={{ padding: '80px 24px 24px' }}>

          {/* Message */}
          {msg && (
            <div style={{
              background: msg.includes('success') ? '#1a2e1a' : '#2e1a1a',
              color: msg.includes('success') ? '#4CAF50' : '#F44336',
              border: `0.5px solid ${msg.includes('success') ? '#4CAF50' : '#F44336'}`,
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '13px',
              marginBottom: '20px',
            }}>
              {msg}
            </div>
          )}

          <div style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>
            Connect your social media accounts to publish posts directly from Postify AI.
          </div>

          {/* Platform Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {Object.entries(PLATFORMS).map(([key, platform]) => {
              const { name, description, color, Icon, available } = platform
              const connected = isConnected(key)

              return (
                <div key={key} style={{
                  background: '#1A1A1A',
                  border: `0.5px solid ${connected ? color : '#2A2A2A'}`,
                  borderRadius: '10px',
                  padding: '20px',
                  opacity: available ? 1 : 0.5,
                  transition: 'border 0.2s',
                }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <div style={{
                      width: '42px', height: '42px',
                      borderRadius: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: '#222',
                    }}>
                      <Icon size={26} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>{name}</div>
                      <div style={{ fontSize: '11px', color: '#888' }}>{description}</div>
                    </div>
                  </div>

                  {/* Status */}
                  {loading ? (
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>Checking...</div>
                  ) : connected ? (
                    <div style={{
                      background: '#1a2e1a',
                      color: '#4CAF50',
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginBottom: '10px',
                    }}>
                      ✓ Connected — {accounts.find(a => a.platform === key)?.name}
                    </div>
                  ) : (
                    <div style={{
                      background: '#2A2A2A',
                      color: '#888',
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px',
                    }}>
                      {available ? 'Not connected' : 'Coming soon'}
                    </div>
                  )}

                  {/* Button */}
                  {available ? (
                    connected ? (
                      <button
                        onClick={() => handleDisconnect(key)}
                        style={{
                          width: '100%',
                          background: 'transparent',
                          border: '0.5px solid #F44336',
                          color: '#F44336',
                          borderRadius: '8px',
                          padding: '8px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          marginTop: '4px',
                        }}>
                        Disconnect
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConnect(key)}
                        style={{
                          width: '100%',
                          background: color,
                          border: 'none',
                          color: '#FFFFFF',
                          borderRadius: '8px',
                          padding: '8px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          marginTop: '4px',
                        }}>
                        Connect {name}
                      </button>
                    )
                  ) : (
                    <button disabled style={{
                      width: '100%',
                      background: '#2A2A2A',
                      border: 'none',
                      color: '#555',
                      borderRadius: '8px',
                      padding: '8px',
                      fontSize: '12px',
                      cursor: 'not-allowed',
                      marginTop: '4px',
                    }}>
                      Connect {name}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Connected