import { useEffect, useRef } from "react";
import { createPortal } from 'react-dom'

import s from './VideoPlayer.module.scss'

function VideoPlayer({onClose}) {
  const startedInside = useRef(false);

  useEffect(() => {
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.overflowY = 'scroll'
    
    return () => {
      document.body.style.position = 'static'
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleMouseDown = (e) => {
    startedInside.current = e.target.closest(`.${s.videoCont}`) !== null;
  };

  const handleMouseUp = (e) => {
    const endedInside = e.target.closest(`.${s.videoCont}`) !== null;
    if (!startedInside.current && !endedInside) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={s.videoModal}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <article className={s.videoCont}>
        <button className={s.closeButton} onClick={() => onClose()}>
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </article>
    </div>,
    document.body
  )
}

export default VideoPlayer