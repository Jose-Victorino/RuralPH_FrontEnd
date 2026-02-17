import React from 'react'
import cn from 'classnames'

import s from './OurJourney.module.scss'

import RecentPost from './RecentPost'

const PAGE_NAME = 'Our Journey'

function OurJourney() {
  document.title = `${PAGE_NAME} | Rural Rising PH`

  return (
    <>
      <div className="container pad-block-20">
        <div className={s.header}>
          <div>
            <input type="text" placeholder='Search...'/>
          </div>
          <div className='flex gap-10'>
            <p>Category</p>
            <select name="catagory" id="catagory">
              <option value="">All</option>
              <option value="capacity building">Capacity Building</option>
              <option value="tourism">Tourism</option>
            </select>
          </div>
        </div>
      </div>
      <RecentPost />
    </>
  )
}

export default OurJourney