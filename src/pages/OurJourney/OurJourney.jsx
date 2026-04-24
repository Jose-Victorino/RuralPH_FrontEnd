import { useState, useEffect } from 'react'
import { useParallax } from 'react-scroll-parallax'
import { journeyService } from '@/service/crudService'
import cn from 'classnames'

import Loader from '@/components/Loader/Loader'
import Button from '@/components/Button/Button'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import Post from './Post'
import Top from './Top'

import CTAbg from 'uploads/CTA-bg.jpg'

import s from './OurJourney.module.scss'

const PAGE_NAME = 'Our Journey'

function OurJourney() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await journeyService.getAll()
      if(!error) setData(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  const { ref: imgBgRef } = useParallax({
    onProgressChange: (progress) => {
      const el = imgBgRef.current
      if (!el) return
      const p = Math.min(1, Math.max(0, progress))
      el.style.objectPosition = `50% ${p * 100}%`
    },
  })

  return (
    <>
      <section>
        <div className='container flex-col gap-20 pad-block-20' style={{minHeight: '60vh'}}>
        {loading ? <Loader />
        : data.length > 0 ?
          <>
            <Top />
            <Post posts={data}/>
          </>
        : <p className='text-center'>No post available</p>
        }
        </div>
      </section>
      <section>
        <div data-ros='fade-down' className="container flex-col gap-15 pad-block-50 text-center">
          <h3 className='textGreen'>Growing Together for a Sustainable Future</h3>
          <h5>Mission, history, farmer spotlights, and BTS.</h5>
          <p>Learn & Explore <br /> Tips, Recipes, and Resources</p>
        </div>
      </section>
      <section className={s.movement}>
        <img
          ref={imgBgRef}
          className={s.ctaBgImg}
          src={CTAbg}
          alt='CTA background'
        />
        <div data-ros='fade-down' className={cn(s.ctaContainer, 'flex j-center a-center')}>
          <div className='flex-col a-center gap-10'>
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
        </div>
      </section>
    </>
  )
}

export default OurJourney