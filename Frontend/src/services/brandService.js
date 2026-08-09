import axios from 'axios'

const API = import.meta.env.VITE_API_URL + '/brand'

const getToken = () => localStorage.getItem('token')

const headers = () => ({
  Authorization: `Bearer ${getToken()}`,
})

export const saveBrandAPI = async (data) => {
  const res = await axios.post(`${API}/save`, data, { headers: headers() })
  return res.data
}

export const getBrandAPI = async () => {
  const res = await axios.get(`${API}/get`, { headers: headers() })
  return res.data
}

export const updateBrandAPI = async (data) => {
  const res = await axios.put(`${API}/update`, data, { headers: headers() })
  return res.data
}