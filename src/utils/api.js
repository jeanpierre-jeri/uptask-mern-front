import axios from 'axios'
import { token } from './auth'

const API_URL = import.meta.env.VITE_BACKEND_URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token()}`
  }
})
