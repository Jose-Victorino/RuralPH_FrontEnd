export function wordCap(str){
  str = str.toLowerCase()

  const words = str.split(' ')

  const capitalizedWords = words.map(word =>
    (word.length > 0) ? word.charAt(0).toUpperCase() + word.slice(1) : ''
  )

  return capitalizedWords.join(' ')
}

export function formatDate(str){
  const [y, m, d] = str.split("-")

  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatTime(str){
  const date = new Date()
  const [h, m, s] = str.split(":")

  date.setHours(h, m, s)

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}