export const token = () => window.localStorage.getItem('token') || ''

export const setToken = ({ token }) => window.localStorage.setItem('token', token)

export const deleteToken = () => window.localStorage.removeItem('token')
