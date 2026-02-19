import React from 'react'

import Top from './Top'

import s from './JourneyCategory.module.scss'

function JourneyCategory() {
  return (
    <>
      <Top />
      <section className='mb-40'>
        <div className="container">
          <ul className={s.postList}>
            <li className={s.postItem}>
              <a href="/our-journey/p/1">
                <div className={s.imageCont}></div>
                <div>
                  <h5>Title</h5>
                  <p>Feb 12, 2026</p>
                </div>
              </a>
            </li>
            <li className={s.postItem}>
              <a href="/our-journey/p/1">
                <div className={s.imageCont}></div>
                <div>
                  <h5>Title</h5>
                  <p>Feb 12, 2026</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default JourneyCategory