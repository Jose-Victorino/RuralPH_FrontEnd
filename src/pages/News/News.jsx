import { useState } from 'react'
import cn from 'classnames'

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'

import s from './News.module.scss'

const PAGE_NAME = 'In The News'

function News() {
  const [open, setOpen] = useState(false)
  document.title = `${PAGE_NAME} | Rural Rising PH`

  return (
    <>
      <section className='pad-block-50'>
        <div className='container flex-col gap-10'>
          <h3>Watch Our Latest Videos</h3>
          <ul className={s.gridList}>
            <li className={s.listItem}>
              <div className={s.thumbnailCont} onClick={() => setOpen(true)}></div>
              <h5>Title</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </li>
            <li className={s.listItem}>
              <div className={s.thumbnailCont}></div>
              <h5>Title</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere odio incidunt natus quod sapiente aliquam quisquam consequuntur architecto cum suscipit?</p>
            </li>
            <li className={s.listItem}>
              <div className={s.thumbnailCont}></div>
              <h5>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium, illo?</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere odio incidunt natus quod sapiente aliquam quisquam consequuntur architecto cum suscipit?</p>
            </li>
            <li className={s.listItem}>
              <div className={s.thumbnailCont}></div>
              <h5>Title</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </li>
            <li className={s.listItem}>
              <div className={s.thumbnailCont}></div>
              <h5>Title</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. quisquam consequuntur architecto cum suscipit?</p>
            </li>
            <li className={s.listItem}>
              <div className={s.thumbnailCont}></div>
              <h5>Lorem ipsum, dolor sit amet consectetur</h5>
              <p>Lorem ipsum dolor sit amet quod sapiente aliquam quisquam consequuntur architecto cum suscipit?</p>
            </li>
          </ul>
        </div>
      </section>
      {open && <VideoPlayer onClose={() => setOpen(false)}/>}
    </>
  )
}

export default News