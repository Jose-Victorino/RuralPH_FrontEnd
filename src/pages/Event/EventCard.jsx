import React from 'react'
import { Link } from'react-router-dom'

import DateBanner from './DateBanner'

import s from './EventCard.module.scss'

import calendar from 'svg/calendar.svg'
import location from 'svg/location-dot.svg'

function EventCard() {
  return (
    <li className={s.eventCard}>
      <Link to='/events/sample'>
        <DateBanner />
        <div className='flex-col gap-5'>
          <h6>Lorem, ipsum dolor.</h6>
          <div className='flex gap-10 a-center'>
            <img className={s.icon} src={calendar} alt="calendar" />
            <p className={s.date}>February 21, 2026 (Saturday)</p>
          </div>
          <div className='flex gap-10 a-center'>
            <img className={s.icon} src={location} alt="location" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default EventCard