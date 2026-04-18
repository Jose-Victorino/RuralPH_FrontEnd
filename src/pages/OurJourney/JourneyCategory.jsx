import React from 'react'
import { Link, useParams } from'react-router'
import { useGlobal } from '@/context/GlobalContext'

import { wordCap, scrollReset } from '@/library/Util'

import Top from './Top'

import s from './JourneyCategory.module.scss'

function JourneyCategory() {
  const { categoryName } = useParams()
  const { state: { ourJourney } } = useGlobal()

  const filteredPost = ourJourney.filter((p) => p.category === wordCap(categoryName.replace('-', ' ')))
  console.log(filteredPost)

  return (filteredPost.length > 0 ?
    <>
      <Top />
      <section className='mb-40'>
        <div className="container" style={{minHeight: '400px'}}>
          <ul className={s.postList}>
            {filteredPost.map((row) => (
              <li key={row.id} className={s.postItem}>
                <Link to={`/our-journey/p/${row.id}`} onClick={() => scrollReset()}>
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
      </section>
    </> :
    <section>
      <div className="container pad-block-80" style={{textAlign: 'center', minHeight: '600px'}}>
        <p>No post found</p>
      </div>
    </section>
  )
}

export default JourneyCategory