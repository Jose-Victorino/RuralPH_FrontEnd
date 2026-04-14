import { useEffect, useRef } from "react"
import { createPortal } from 'react-dom'

import s from './Modal.module.scss'

function Modal({
  children,
  onClose,
  title = null,
  height = '520px',
  width = 'fit-content',
}){
  const startedInside = useRef(false)

  useEffect(() => {
    const root = document.getElementById('root')
    const { body, documentElement } = document
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    const hasVerticalScrollbar = scrollbarWidth > 0

    body.style.overflow = 'hidden'
    root.inert = 'true'
    
    if(hasVerticalScrollbar){
      const computedPaddingRight = parseFloat(window.getComputedStyle(body).paddingRight) || 0
      body.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`
    }
    
    return () => {
      root.inert = ''
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [])
  
  const handleMouseDown = (e) => {
    startedInside.current = e.target.closest('.modal-container') !== null
  }

  const handleMouseUp = (e) => {
    const endedInside = e.target.closest('.modal-container') !== null
    if (!startedInside.current && !endedInside) {
      onClose()
    }
  }

  return createPortal(
    <div
      className={s.modalOverlay}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      role="presentation"
    >
      <div
        className={`${s.modalContainer} modal-container`}
        style={{ height, width }}
        role="document"
        tabIndex="-1"
      >
        <div className={s.header} style={{ justifyContent: title ? 'space-between' : 'right' }}>
          {title &&
            <b>{title}</b>
          }
          <button className={s.closeButton} onClick={() => onClose()}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
          <div className={s.mainContent}>
            {children}
          </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal