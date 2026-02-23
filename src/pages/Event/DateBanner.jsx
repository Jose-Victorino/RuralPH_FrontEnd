import React from 'react'

import s from './DateBanner.module.scss'

function DateBanner() {
  return (
    <div className={s.dateBanner}>
      <div className={s.month}>
        <p>Feb</p>
      </div>
      <div className={s.day}>
        <p>21</p>
      </div>
    </div>
  )
}

export default DateBanner