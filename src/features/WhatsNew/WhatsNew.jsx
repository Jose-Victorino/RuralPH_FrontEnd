import cn from 'classnames'

import Button from '@/components/Button/Button'

import s from './WhatsNew.module.scss'

function WhatsNew() {

  
  return (
    <section className='pad-block-100'>
      <div className={cn("container flex-col gap-30")}>
        <h2 className='text-center'>What's New at <span className='textGreen'>Rural Rising</span></h2>
        <ul className={s.whatsNew}>
          <li>
            <div className={s.videoContainer}>
            </div>
            <h5 className='textYellow'>We receive a recognition</h5>
            <p>Find out how our pioneering work got recognized and awarded at the Ginebra Ako Year 4 Awards. Learn more about what this means for Rural Rising and all farmers across the country.</p>
          </li>
          <li>
            <div className={s.videoContainer}>
            </div>
            <h5 className='textYellow'>An Angel visits the farmers of Licab</h5>
            <p>Follow Rural Rising’s inspiring story of how they joined forces with Angel Locsin to bring aid and hope to the farmers of Licab. See how you can get involved and make a difference now.</p>
          </li>
          <li>
            <div className={s.videoContainer}>
            </div>
            <h5 className='textYellow'>Preserving amazing earth and vital water:</h5>
            <p>Learn how Rural Rising works with the local government and other key stakeholders to help farmers and their communities in Mt. Mingan preserve their vital water source and protect the environment.</p>
          </li>
        </ul>
        <Button
          text='View More'
          color='yellow'
          span
          role='link'
          style={{alignSelf: 'center'}}
          onClick={() => navigate('/in-the-news')}
        />
      </div>
    </section>
  )
}

export default WhatsNew