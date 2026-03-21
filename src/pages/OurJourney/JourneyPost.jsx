import React from 'react'
import { Link, useParams } from'react-router-dom'
import { useGlobal } from '@/context/GlobalContext'

import s from './JourneyPost.module.scss'

import facebook from '@/assets/svg/facebook.svg'
import xTwitter from '@/assets/svg/x-twitter.svg'
import linkedin from '@/assets/svg/linkedin.svg'

const PAGE_NAME = 'Our Journey'

function Post() {
  const { postId } = useParams()
  const { state: { ourJourney } } = useGlobal()

  document.title = `${PAGE_NAME} | Rural Rising PH`

  const selectedPost = ourJourney.filter((p) => p.id === parseInt(postId))[0]
  
  const recentPost = ourJourney.filter((p) => p.id !== parseInt(postId)).slice(0, 4)

  return (selectedPost ?
    <>
      <section>
        <div className="container flex-col gap-10 pad-block-50">
          <Link to='/our-journey' className={s.goBack}>Go Back</Link>
          <div className={s.header}>
            <div>
              <h3 className='textGreen'>{selectedPost.title}</h3>
              <p>{selectedPost.posted_at}</p>
            </div>
            <ul className='flex a-end gap-10'>
              <li className='flex'>
                <Link to="">
                  <img src={facebook} height='24' width='24' loading='lazy' alt="Facebook" />
                </Link>
              </li>
              <li className='flex'>
                <Link to="">
                  <img src={xTwitter} height='24' width='24' loading='lazy' alt="X" />
                </Link>
              </li>
              <li className='flex'>
                <Link to="">
                  <img src={linkedin} height='24' width='24' loading='lazy' alt="Linkedin" />
                </Link>
              </li>
            </ul>
          </div>
          <hr />
          <div className={s.imageCont}>
            <img className={s.img} src={selectedPost.image_path} loading='lazy' alt={selectedPost.title} />
          </div>
          <div className={s.htmlInsert} dangerouslySetInnerHTML={{__html: selectedPost.description}}/>
        </div>
      </section>
      <section>
        <div className="container flex-col gap-10 pad-block-50">
          <h3>Recent Posts</h3>
          <ul className={s.postList}>
            {recentPost.map((row) => (
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
      </section>
    </> :
    <section>
      <div className="container pad-block-80" style={{textAlign: 'center', minHeight: '600px'}}>
        <p>Post not found</p>
      </div>
    </section>
  )
}

export default Post