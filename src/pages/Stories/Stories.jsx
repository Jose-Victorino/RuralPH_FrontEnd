import React from 'react'

import s from './Stories.module.scss'

const PAGE_NAME = 'Stories'

const shareSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M371.8 82.4C359.8 87.4 352 99 352 112L352 192L240 192C142.8 192 64 270.8 64 368C64 481.3 145.5 531.9 164.2 542.1C166.7 543.5 169.5 544 172.3 544C183.2 544 192 535.1 192 524.3C192 516.8 187.7 509.9 182.2 504.8C172.8 496 160 478.4 160 448.1C160 395.1 203 352.1 256 352.1L352 352.1L352 432.1C352 445 359.8 456.7 371.8 461.7C383.8 466.7 397.5 463.9 406.7 454.8L566.7 294.8C579.2 282.3 579.2 262 566.7 249.5L406.7 89.5C397.5 80.3 383.8 77.6 371.8 82.6z"/></svg>

function Stories() {
  document.title = `${PAGE_NAME} | Rural Rising PH`

  return (
    <>
      <section className={s.stories}>
        <div className='container flex-col gap-30'>
          <ul className={s.storyList}>
            <li className={s.storyItem}>
              <div className='flex-col gap-10'>
                <div className='flex j-space-between'>
                  <div className={s.left}>
                    <h5>Lorem, ipsum dolor.</h5>
                    <p className='lh-1'>February 21, 2026</p>
                  </div>
                  <div>
                    <a href="">
                      {shareSvg}
                    </a>
                  </div>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae culpa deleniti ducimus molestiae, ullam deserunt. Fugit alias distinctio sequi eveniet quo a, reiciendis sapiente sed quam numquam, doloremque sunt quae.</p>
              </div>
              <div className='flex j-center'>
                <div className={s.imgCont}>
                </div>
              </div>
            </li>
            <li className={s.storyItem}>
              <div className='flex-col gap-10'>
                <div className='flex j-space-between'>
                  <div className={s.left}>
                    <h5>Lorem, ipsum dolor.</h5>
                    <p className='lh-1'>February 21, 2026</p>
                  </div>
                  <div>
                    <a href="">
                      {shareSvg}
                    </a>
                  </div>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae culpa deleniti ducimus molestiae, ullam deserunt. Fugit alias distinctio sequi eveniet quo a, reiciendis sapiente sed quam numquam, doloremque sunt quae.</p>
              </div>
              <div className='flex j-center'>
                <div className={s.imgCont}>
                </div>
              </div>
            </li>
            <li className={s.storyItem}>
              <div className='flex-col gap-10'>
                <div className='flex j-space-between'>
                  <div className={s.left}>
                    <h5>Lorem, ipsum dolor.</h5>
                    <p className='lh-1'>February 21, 2026</p>
                  </div>
                  <div>
                    <a href="">
                      {shareSvg}
                    </a>
                  </div>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae culpa deleniti ducimus molestiae, ullam deserunt. Fugit alias distinctio sequi eveniet quo a, reiciendis sapiente sed quam numquam, doloremque sunt quae.</p>
              </div>
              <div className='flex j-center'>
                <div className={s.imgCont}>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Stories