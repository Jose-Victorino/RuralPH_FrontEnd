import { useEffect } from "react"
import { useLocation } from "react-router"

export function wordCap(str){
  str = str.toLowerCase()

  const words = str.split(' ')

  const capitalizedWords = words.map(word =>
    (word.length > 0) ? word.charAt(0).toUpperCase() + word.slice(1) : ''
  )

  return capitalizedWords.join(' ')
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime())
}

export function formatDate(str) {
  if(!str) return str

  const datePart = str.includes("T") ? str.split("T")[0] : str
  const [y, m, d] = datePart.split(/[-/]/)

  const date = new Date(Number(y), Number(m) - 1, Number(d))

  if(!isValidDate(date)) return ''

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
export function formatTime(str) {
  if(!str) return str

  const timePart = str.includes("T") ? str.split("T")[1] : str
  let [h, m, s] = timePart.split(":")

  if(s){
    s = s.split(".")[0]
    s = s.split("+")[0]
    s = s.split("-")[0]
  }

  const date = new Date()
  date.setHours(Number(h), Number(m), Number(s || 0))

  if(!isValidDate(date)) return ''

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}
export function formatDateTime(str) {
  const date = formatDate(str)
  const time = formatTime(str)

  if(!date && !time) return ''
  if(!date) return time
  if(!time) return date

  return date + ', ' + time
}

function scrollReset(container){
  try {
    if(typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo(0, 0)
    }
    if(document){
      if(document.documentElement) document.documentElement.scrollTop = 0
      if(document.body) document.body.scrollTop = 0
    }

    if(container && container.scrollTop) container.scrollTop = 0
  }catch{}
}
export function useScrollReset(container){
  const location = useLocation()

  useEffect(() => scrollReset(container), [container, location.pathname])
}
export { scrollReset }