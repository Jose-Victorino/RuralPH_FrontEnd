import React from 'react'
import { Link } from'react-router-dom'
import { useGlobal } from '@/context/GlobalContext'
import cn from 'classnames'

import s from './RecentPost.module.scss'

function RecentPost() {
  const { state: { ourJourney } } = useGlobal()

  const journeyData = [...ourJourney]
  const firstJourney = journeyData.shift()
  const nextThree = journeyData.slice(0, 3)
  const remaining = journeyData.slice(3)
  
  return (
    <section>
      <div className='container'>
        <h5 data-ros='fade-right' className='mb-10'>Recent Posts</h5>
        <div className={cn(s.recentPosts)}>
          <div data-ros='fade-right' className={s.mainPost}>
            <Link to={`/our-journey/p/${firstJourney.id}`}>
              <div className={s.imageCont}>
                <img className={s.img} src={firstJourney.image_path} loading='lazy' alt={firstJourney.title} />
              </div>
              <div>
                <h5>{firstJourney.title}</h5>
                <p>{firstJourney.posted_at}</p>
              </div>
            </Link>
          </div>
          <ul data-ros='fade-left' className={s.postList}>
            {nextThree.map((row) => (
              <li key={row.id} className={s.postItem}>
                <Link to={`/our-journey/p/${row.id}`}>
                  <div className={s.imageCont}>
                    <img className={s.img} src={row.image_path} loading='lazy' alt={row.title} />
                  </div>
                  <div className={s.content}>
                    <h5>{row.title}</h5>
                    <p>{row.posted_at}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default RecentPost