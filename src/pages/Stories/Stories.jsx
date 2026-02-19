import React from 'react'

import s from './Stories.module.scss'

const PAGE_NAME = 'Stories'

function Stories() {
  document.title = `${PAGE_NAME} | Rural Rising PH`

  return (
    <>
      <section className='pad-block-50'>
        <div className='container flex-col gap-30'>
          <h3>Watch Our Latest Videos</h3>
        </div>
      </section>
    </>
  )
}

export default Stories