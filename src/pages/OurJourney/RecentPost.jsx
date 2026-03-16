import React from 'react'
import { Link } from'react-router-dom'
import cn from 'classnames'

import s from './RecentPost.module.scss'

function RecentPost() {
  
  return (
    <section>
      <div className='container'>
        <h5 data-ros='fade-right' className='mb-10'>Recent Posts</h5>
        <div className={cn(s.recentPosts)}>
          <div data-ros='fade-right' className={s.mainPost}>
            <Link to="/our-journey/p/1a">
              <div className={s.imageCont}></div>
              <div>
                <h5>Title</h5>
                <p>Feb 12, 2026</p>
              </div>
            </Link>
          </div>
          <ul data-ros='fade-left' className={s.postList}>
            <li className={s.postItem}>
              <Link to="/our-journey/p/1b">
                <div className={s.imageCont}></div>
                <div>
                  <h5>Title</h5>
                  <p>Feb 12, 2026</p>
                </div>
              </Link>
            </li>
            <li className={s.postItem}>
              <Link to="/our-journey/p/1c">
                <div className={s.imageCont}></div>
                <div>
                  <h5>Title</h5>
                  <p>Feb 12, 2026</p>
                </div>
              </Link>
            </li>
            <li className={s.postItem}>
              <Link to="/our-journey/p/1d">
                <div className={s.imageCont}></div>
                <div>
                  <h5>Title</h5>
                  <p>Feb 12, 2026</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default RecentPost