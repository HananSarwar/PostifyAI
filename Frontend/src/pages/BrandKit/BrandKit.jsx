import { useState, useEffect } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import TopBar from '../../components/layout/TopBar'
import { saveBrandAPI, getBrandAPI } from '../../services/brandService'

const tones = ['formal', 'casual', 'witty', 'inspirational']

const BrandKit = () => {
  const [form, setForm] = useState({
    brandName: '',
    industry: '',
    brandDescription: '',
    targetAudience: '',
    tone: 'casual',
    colors: {
      primary: '#FFFFFF',
      secondary: '#000000',
      accent: '#534AB7',
    },
    logoUrl: '',
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const data = await getBrandAPI()
        if (data.brand) setForm(data.brand)
      } catch (err) {
        // No brand yet — use defaults
      } finally {
        setFetching(false)
      }
    }
    fetchBrand()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleColorChange = (colorKey, value) => {
    setForm({ ...form, colors: { ...form.colors, [colorKey]: value } })
  }

  const handleSave = async () => {
    setLoading(true)
    setMsg('')
    try {
      await saveBrandAPI(form)
      setMsg('Brand kit saved successfully!')
    } catch (err) {
      setMsg('Failed to save. Try again!')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#222',
    border: '0.5px solid #2A2A2A',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '13px',
    color: '#FFFFFF',
    outline: 'none',
  }

  const labelStyle = {
    fontSize: '12px',
    color: '#888',
    marginBottom: '6px',
    display: 'block',
  }

  if (fetching) return (
    <div style={{ display: 'flex', background: '#0F0F0F', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
        Loading brand kit...
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', background: '#0F0F0F', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', flex: 1 }}>
        <TopBar title="Brand Kit" />
        <div style={{ padding: '80px 24px 24px' }}>

          {msg && (
            <div style={{
              background: msg.includes('success') ? '#1a2e1a' : '#2e1a1a',
              color: msg.includes('success') ? '#4CAF50' : '#F44336',
              border: `0.5px solid ${msg.includes('success') ? '#4CAF50' : '#F44336'}`,
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '13px',
              marginBottom: '16px',
            }}>
              {msg}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

            {/* LEFT — Brand Info */}
            <div style={{
              background: '#1A1A1A',
              border: '0.5px solid #2A2A2A',
              borderRadius: '10px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                ❖ Brand Identity
              </div>

              <div>
                <label style={labelStyle}>Brand Name</label>
                <input name="brandName" value={form.brandName} onChange={handleChange} placeholder="e.g. Postify AI" style={inputStyle}/>
              </div>

              <div>
                <label style={labelStyle}>Industry</label>
                <input name="industry" value={form.industry} onChange={handleChange} placeholder="e.g. Digital Marketing" style={inputStyle}/>
              </div>

              <div>
                <label style={labelStyle}>Brand Description</label>
                <textarea
                  name="brandDescription"
                  value={form.brandDescription}
                  onChange={handleChange}
                  placeholder="Describe your brand in a few sentences..."
                  style={{ ...inputStyle, height: '80px', resize: 'none' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Target Audience</label>
                <input name="targetAudience" value={form.targetAudience} onChange={handleChange} placeholder="e.g. Young professionals 25-35" style={inputStyle}/>
              </div>

              <div>
                <label style={labelStyle}>Tone of Voice</label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {tones.map(t => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, tone: t })}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        border: '0.5px solid',
                        borderColor: form.tone === t ? '#FFFFFF' : '#2A2A2A',
                        background: form.tone === t ? '#FFFFFF' : '#222',
                        color: form.tone === t ? '#000000' : '#888',
                        textTransform: 'capitalize',
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Colors + Logo */}
            <div style={{
              background: '#1A1A1A',
              border: '0.5px solid #2A2A2A',
              borderRadius: '10px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                ◈ Brand Colors & Logo
              </div>

              {/* Colors */}
              {['primary', 'secondary', 'accent'].map((colorKey) => (
                <div key={colorKey} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="color"
                    value={form.colors[colorKey]}
                    onChange={(e) => handleColorChange(colorKey, e.target.value)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      border: '0.5px solid #2A2A2A',
                      cursor: 'pointer',
                      background: 'none',
                      padding: '2px',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '12px', color: '#FFFFFF', textTransform: 'capitalize' }}>
                      {colorKey} Color
                    </div>
                    <div style={{ fontSize: '11px', color: '#888' }}>{form.colors[colorKey]}</div>
                  </div>
                </div>
              ))}

              {/* Color Preview */}
              <div>
                <label style={labelStyle}>Color Preview</label>
                <div style={{
                  background: form.colors.primary,
                  border: `3px solid ${form.colors.accent}`,
                  borderRadius: '8px',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <div style={{
                    width: '32px', height: '32px',
                    borderRadius: '6px',
                    background: form.colors.accent,
                  }}/>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: form.colors.secondary }}>
                      {form.brandName || 'Your Brand'}
                    </div>
                    <div style={{ fontSize: '11px', color: form.colors.secondary, opacity: 0.7 }}>
                      {form.industry || 'Your Industry'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo URL */}
              <div>
                <label style={labelStyle}>Logo URL</label>
                <input
                  name="logoUrl"
                  value={form.logoUrl}
                  onChange={handleChange}
                  placeholder="https://your-logo-url.com/logo.png"
                  style={inputStyle}
                />
                {form.logoUrl && (
                  <img
                    src={form.logoUrl}
                    alt="Brand logo"
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'contain',
                      marginTop: '8px',
                      borderRadius: '8px',
                      border: '0.5px solid #2A2A2A',
                    }}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              marginTop: '16px',
              background: loading ? '#333' : '#FFFFFF',
              color: loading ? '#888' : '#000000',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 32px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}>
            {loading ? 'Saving...' : '✓ Save Brand Kit'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BrandKit