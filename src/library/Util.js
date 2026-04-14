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

export function formatDate(str){
  if (!str) return str  

  const datePart = str.includes("T") ? str.split("T")[0] : str

  const [y, m, d] = datePart.split(/[-/]/)

  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
export function formatTime(str){
  if (!str) return str

  const timePart = str.includes("T") ? str.split("T")[1] : str

  let [h, m, s] = timePart.split(":")

  if(s){
    s = s.split(".")[0]
    s = s.split("+")[0]
    s = s.split("-")[0]
  }

  const date = new Date()
  date.setHours(Number(h), Number(m), Number(s || 0))

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}
export function formatDateTime(str){
  return formatDate(str) + ', ' + formatTime(str)
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

  useEffect(scrollReset(container), [location.pathname])
}
export { scrollReset }