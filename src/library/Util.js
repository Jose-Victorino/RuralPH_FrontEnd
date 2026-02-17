import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function wordCap(str) {
  str = str.toLowerCase()

  const words = str.split(' ')

  const capitalizedWords = words.map(word =>
    (word.length > 0) ? word.charAt(0).toUpperCase() + word.slice(1) : ''
  )

  return capitalizedWords.join(' ')
}