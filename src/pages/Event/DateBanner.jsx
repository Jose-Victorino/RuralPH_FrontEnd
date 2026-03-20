import React from 'react'

import s from './DateBanner.module.scss'

function DateBanner({ date }) {
  const isValidDate = date instanceof Date && !Number.isNaN(date.getTime())

  const month = isValidDate
    ? date.toLocaleDateString('en-US', {
        month: 'short',
      })
    : ''

  const day = isValidDate ? date.getDate() : ''

  return (
    <div className={s.dateBanner}>
      <div className={s.month}>
        <p>{month}</p>
      </div>
      <div className={s.day}>
        <p>{day}</p>
      </div>
    </div>
  )
}

export default DateBanner