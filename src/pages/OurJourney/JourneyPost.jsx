import React from 'react'
import { Link } from'react-router-dom'

import s from './JourneyPost.module.scss'

import facebook from '@/assets/svg/facebook.svg'
import xTwitter from '@/assets/svg/x-twitter.svg'
import linkedin from '@/assets/svg/linkedin.svg'

const PAGE_NAME = 'Our Journey'

function Post() {
  document.title = `${PAGE_NAME} | Rural Rising PH`

  return (
    <>
      <section>
        <div className="container flex-col gap-10 pad-block-50">
          <Link to='/our-journey' className={s.goBack}>Go Back</Link>
          <div className={s.header}>
            <div>
              <h3 className='textGreen'>Title</h3>
              <p>Feb 12, 2026</p>
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
          <div className={s.imageCont}></div>
          <div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero accusantium dolor repellat nulla? Harum adipisci dolor, dolorem doloribus non, voluptate velit pariatur veniam rerum laboriosam odit? Aspernatur unde quae nulla accusantium aliquid et neque recusandae blanditiis, deserunt vero expedita. Impedit repellendus obcaecati eaque sequi, ullam autem quod hic iste quis tempora cumque non expedita! Eaque ullam sequi quidem molestias voluptas ducimus veritatis error harum tempore officia odit in, nulla expedita quo soluta dolorem dolore doloremque. Maxime, quia ab. Eligendi quis voluptate error iure temporibus quasi perferendis debitis qui magnam voluptates quaerat, obcaecati nobis delectus natus molestiae ipsa doloribus nihil iste.</p>
          </div>
        </div>
      </section>
      <section>
        <div className="container flex-col gap-10 pad-block-50">
          <h3>Recent Posts</h3>
          <ul className={s.postList}>
            <li className={s.postItem}>
              <Link to="/our-journey/p/2a">
                <div className={s.imageCont}></div>
                <div>
                  <h5 className='textGreen'>Title</h5>
                  <p>Feb 12, 2026</p>
                </div>
              </Link>
            </li>
            <li className={s.postItem}>
              <Link to="/our-journey/p/2b">
                <div className={s.imageCont}></div>
                <div>
                  <h5 className='textGreen'>Title</h5>
                  <p>Feb 12, 2026</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Post