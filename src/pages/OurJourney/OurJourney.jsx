import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import Button from '@/components/Button/Button'
import RecentPost from './RecentPost'

import Top from './Top'

import spousesImg from 'uploads/rural-philippines-e1682368256444.png'

import s from './OurJourney.module.scss'

const PAGE_NAME = 'Our Journey'

function OurJourney() {
  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)

  return (
    <>
      <Top />
      <RecentPost />
      <section>
        <div data-ros='fade-down' className="container flex-col gap-15 pad-block-50" style={{textAlign: 'center'}}>
          <h3 className='textGreen'>Growing Together for a Sustainable Future</h3>
          <h5>Mission, history, farmer spotlights, and BTS.</h5>
          <p>Learn & Explore <br /> Tips, Recipes, and Resources</p>
        </div>
      </section>
      <section className={s.movement}>
        <div data-ros='fade-down' className='container flex-col a-center pad-block-100 gap-25'>
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
            to='https://ruriclub.com/pages/membership'
          />
        </div>
      </section>
      <section className='pad-block-120'>
        <div className='container flex-col gap-10'>
          <div data-ros='fade-right'>
            <h2 className='textGreen'>Camp Mingan</h2>
            <p>A Living Example of Our Mission</p>
          </div>
          <div className='res-flex-row'>
            <img data-ros='fade-right' className={s.img} loading="lazy" src={spousesImg} alt='img'/>
            <div data-ros='fade-left' className='flex-col gap-15'>
              <p>At Rural Rising, we’re proud to bring Camp Mingan to life—a conservation park that empowers rural communities through sustainable practices and environmental stewardship. As a cornerstone of our mission to uplift Filipino farmers and promote sustainability, Camp Mingan serves as a model for community-driven conservation and development.</p>
              <p>Learn more about how Camp Mingan is transforming lives and landscapes.</p>
              <Button
                text='Explore Camp Mingan'
                color='yellow'
                span
                role='link'
                to='https://campmingan.com/'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OurJourney