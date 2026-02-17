import { useRef } from "react"
import { createPortal } from 'react-dom'

import s from './Modal.module.scss'

function Modal({
  children,
  onClose,
  title = null,
  height = '520px',
  width = 'fit-content',
}){
  const startedInside = useRef(false);

  const handleMouseDown = (e) => {
    startedInside.current = e.target.closest('.modal-container') !== null;
  };

  const handleMouseUp = (e) => {
    const endedInside = e.target.closest('.modal-container') !== null;
    if (!startedInside.current && !endedInside) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={s.modalOverlay}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      // role="presentation"
      // aria-hidden="true"
    >
      <div
        className={`${s.modalContainer} modal-container`}
        style={{ height, width }}
        role="document"
        // tabIndex="-1"
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