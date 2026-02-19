import React from 'react'

import s from './Events.module.scss'

import calendar from 'svg/calendar.svg'
import location from 'svg/location-dot.svg'

const PAGE_NAME = 'Events'

function Event() {
  document.title = `${PAGE_NAME} | Rural Rising PH`

  return (
    <>
      <section>
        <div className="container pad-block-20">
          <div className={s.header}>
            <div>
              <input type="text" placeholder='Search...'/>
            </div>
            <div className='flex gap-10'>
              <p>All</p>
            </div>
          </div>
        </div>
      </section>
      <section className='pad-block-50'>
        <div className='container flex-col gap-30'>
          <h3 className='textGreen'>Upcoming Events</h3>
        </div>
      </section>
    </>
  )
}

export default Event