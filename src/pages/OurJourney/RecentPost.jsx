import React from 'react'

import s from './RecentPost.module.scss'

function RecentPost() {
  return (
    <div className='container'>
      <h5>Recent Posts</h5>
      <div className={s.mainPost}>
        <div></div>
      </div>
      <div className={s.postList}>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default RecentPost