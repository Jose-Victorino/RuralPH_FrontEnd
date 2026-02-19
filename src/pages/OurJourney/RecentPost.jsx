import React from 'react'
import cn from 'classnames'

import s from './RecentPost.module.scss'

function RecentPost() {
  
  return (
    <section>
      <div className='container'>
        <h5 className='mb-10'>Recent Posts</h5>
        <div className={cn(s.recentPosts)}>
          <div className={s.mainPost}>
            <a href="/our-journey/p/1">
              <div className={s.imageCont}></div>
              <div>
                <h5>Title</h5>
                <p>Feb 12, 2026</p>
              </div>
            </a>
          </div>
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
      </div>
    </section>
  )
}

export default RecentPost