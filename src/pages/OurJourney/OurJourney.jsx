import React from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import Button from '@/components/Button/Button'
import RecentPost from './RecentPost'

import Top from './Top'

import s from './OurJourney.module.scss'

const PAGE_NAME = 'Our Journey'

function OurJourney() {
  const navigate = useNavigate()
  document.title = `${PAGE_NAME} | Rural Rising PH`

  return (
    <>
      <Top />
      <RecentPost />
      <section>
        <div className="container flex-col gap-15 pad-block-50" style={{textAlign: 'center'}}>
          <h2 className='textGreen'>Growing Together for a Sustainable Future</h2>
          <h3>Mission, history, farmer spotlights, and BTS.</h3>
          <p>Learn & Explore <br /> Tips, Recipes, and Resources</p>
        </div>
      </section>
      <section className={s.movement}>
        <div className='container flex-col a-center pad-block-150 gap-25'>
          <div className={s.content}>
            <h3>Be Part of the Movement</h3>
            <p>Discover how your support makes a difference. Join Ruri Club today and help us empower farmers and build a sustainable future.</p>
          </div>
          <Button
            text='Join Ruri Club'
            color='yellow'
            size='lg'
            span
            role='link'
            onClick={() => navigate('https://ruriclub.com/membership/')}
          />
        </div>
      </section>
      <section className='pad-block-120'>
        <div className='container flex-col gap-10'>
          <div>
            <h2 className='textGreen'>Camp Mingan</h2>
            <p>A Living Example of Our Mission</p>
          </div>
          <div className='res-flex-row'>
            <div className={s.imgCont}></div>
            <div className='flex-col gap-15'>
              <p>At Rural Rising, we’re proud to bring Camp Mingan to life—a conservation park that empowers rural communities through sustainable practices and environmental stewardship. As a cornerstone of our mission to uplift Filipino farmers and promote sustainability, Camp Mingan serves as a model for community-driven conservation and development.</p>
              <p>Learn more about how Camp Mingan is transforming lives and landscapes.</p>
              <Button
                text='Explore Camp Mingan'
                color='yellow'
                span
                role='link'
                onClick={() => navigate('https://campmingan.com/')}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OurJourney