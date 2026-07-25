import axios from 'axios'
const API = import.meta.env.VITE_API_URL + '/auth'
export const signupAPI = async (data) => {
  const res = await axios.post(`${API}/signup`, data)
  return res.data
}
export const loginAPI = async (data) => {
  const res = await axios.post(`${API}/login`, data)
  return res.data
}
export const getMeAPI = async (token) => {
  const res = await axios.get(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}