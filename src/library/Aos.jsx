import { useEffect } from "react"
import { useLocation } from "react-router"

function RosAnimation() {
  const location = useLocation()

  useEffect(() => {
    const applyDuration = () => {
      const rosDuration = document.querySelectorAll("[data-ros-duration]")

      rosDuration.forEach((el) => {
        const duration = el.getAttribute("data-ros-duration")

        if(duration) el.style.transition = duration
      })
    }

    const rosCall = () => {
      const ros = document.querySelectorAll("[data-ros]")
      const screenPos = window.innerHeight - window.innerHeight / 3.1

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

    applyDuration()
    rosCall()

    window.addEventListener("scroll", rosCall)
    window.addEventListener("resize", rosCall)

    const observer = new MutationObserver(() => {
      // Re-run when async content is mounted without user scroll.
      requestAnimationFrame(() => {
        applyDuration()
        rosCall()
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      window.removeEventListener("scroll", rosCall)
      window.removeEventListener("resize", rosCall)
      observer.disconnect()
    }
  }, [location.pathname])

  return null
}

export default RosAnimation