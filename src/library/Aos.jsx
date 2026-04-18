import { useEffect } from "react"
import { useLocation } from "react-router"

function RosAnimation() {
  const location = useLocation()

  useEffect(() => {
    const ros = document.querySelectorAll("[data-ros]")
    const rosDuration = document.querySelectorAll("[data-ros-duration]")

    const screenPos = window.innerHeight - window.innerHeight / 3.1

    rosDuration.forEach((el) => {
      const duration = el.getAttribute("data-ros-duration")

      if(duration) el.style.transition = duration
    })

    const rosCall = () => {
      ros.forEach((el) => {
        const pos = el.getBoundingClientRect().top

        if(pos < screenPos && !el.dataset.rosActive){
          el.dataset.rosActive = "true"
          
          el.addEventListener('transitionend', () => {
            el.style.transition = 'none'
          }, { once: true })
        }
      })
    }

    rosCall()

    window.addEventListener("scroll", rosCall)

    return () => {
      window.removeEventListener("scroll", rosCall)
    }
  }, [location.pathname])

  return null
}

export default RosAnimation