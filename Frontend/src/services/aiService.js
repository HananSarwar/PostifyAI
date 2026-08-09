import axios from 'axios'

const API = import.meta.env.VITE_API_URL + '/ai'

const getToken = () => localStorage.getItem('token')

const headers = () => ({
  Authorization: `Bearer ${getToken()}`,
})

export const generateCaptionAPI = async (data) => {
  const res = await axios.post(`${API}/generate-caption`, data, { headers: headers() })
  return res.data
}

export const generateHashtagsAPI = async (data) => {
  const res = await axios.post(`${API}/generate-hashtags`, data, { headers: headers() })
  return res.data
}

export const optimizeToneAPI = async (data) => {
  const res = await axios.post(`${API}/optimize-tone`, data, { headers: headers() })
  return res.data
}

export const getHistoryAPI = async () => {
  const res = await axios.get(`${API}/history`, { headers: headers() })
  return res.data
}