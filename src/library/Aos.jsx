import { useEffect } from "react"

function RosAnimation() {
  useEffect(() => {
    const ros = document.querySelectorAll("[data-ros]")
    const rosDuration = document.querySelectorAll("[data-ros-duration]")

    const screenPos = window.innerHeight - window.innerHeight / 3.2

    rosDuration.forEach((el) => {
      const duration = el.getAttribute("data-ros-duration")

      if(duration) el.style.transition = duration
    })

    const rosCall = () => {
      ros.forEach((el) => {
        const pos = el.getBoundingClientRect().top

        if(pos < screenPos && !el.classList.contains("rosActive")){
          el.classList.add("rosActive")
          
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
  }, [])

  return null
}

export default RosAnimation