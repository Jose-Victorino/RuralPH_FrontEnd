import { Link } from'react-router-dom'

import { scrollReset } from '@/library/Util'
import DateBanner from './DateBanner'

import s from './EventCard.module.scss'

import calendar from 'svg/calendar.svg'
import location from 'svg/location-dot.svg'

function EventCard(event) {
  const date = new Date(event.date)
  const exactDate = `${date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })} (${date.toLocaleDateString('en-US', {
    weekday: 'long'
  })})`
  
  return (
    <li className={s.eventCard}>
      <Link to={`/events/${event.id}`} onClick={() => scrollReset()}>
        <DateBanner date={date} />
        <div className='flex-col gap-5'>
          <h6>{event.title}</h6>
          <div className='flex gap-10 a-center'>
            <img className={s.icon} src={calendar} alt="calendar" />
            <p className={s.date}>{exactDate}</p>
          </div>
          <div className='flex gap-10 a-center'>
            <img className={s.icon} src={location} alt="location" />
            <p>{event.location}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default EventCard