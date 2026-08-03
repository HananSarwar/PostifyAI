import axios from 'axios'

const API = import.meta.env.VITE_API_URL + '/social'

const getToken = () => localStorage.getItem('token')

export const getConnectedAccounts = async () => {
  const res = await axios.get(`${API}/accounts`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return res.data
}

export const connectLinkedIn = () => {
  const token = getToken()
  console.log('API URL:', `${API}/linkedin?token=${token}`)
  console.log('Token:', token)
  window.location.href = `${API}/linkedin?token=${token}`
}

export const disconnectAccount = async (platform) => {
  const res = await axios.delete(`${API}/disconnect/${platform}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return res.data
}