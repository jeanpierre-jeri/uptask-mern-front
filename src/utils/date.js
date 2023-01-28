export const formatDate = (date) => {
  const newDate = new Date(date.split('T', 1)[0].split('-'))

  const formatter = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  })

  return formatter.format(newDate)
}

export const getToday = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month.toString().padStart(2, '0')}-${day}`
}
