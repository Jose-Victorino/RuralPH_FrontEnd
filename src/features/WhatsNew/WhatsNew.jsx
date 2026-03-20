import { useState } from 'react'
import cn from 'classnames'

import Button from '@/components/Button/Button'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'

import s from './WhatsNew.module.scss'

const VIDEOS = [
  {
    id: 1,
    title: 'We receive a recognition',
    description: 'Find out how our pioneering work got recognized and awarded at the Ginebra Ako Year 4 Awards. Learn more about what this means for Rural Rising and all farmers across the country.',
    videoId: '661363282',
    thumbnailLink: 'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1337236120-39cf68f9519e4626f52d438f2e37f4df73472db5d28386a9cbb4c27742d175ea-d_295x166%3Fregion%3Dus&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
  },
  {
    id: 2,
    title: 'An Angel visits the farmers of Licab',
    description: 'Follow Rural Rising’s inspiring story of how they joined forces with Angel Locsin to bring aid and hope to the farmers of Licab. See how you can get involved and make a difference now.',
    videoId: '627961587',
    thumbnailLink: 'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1270279023-2b4eb3835e4d089bdcf0c5ebb5647e57b0b37c35269b0b3c3_295x166%3Fregion%3Dus&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
  },
  {
    id: 3,
    title: 'Preserving amazing earth and vital water:',
    description: 'Learn how Rural Rising works with the local government and other key stakeholders to help farmers and their communities in Mt. Mingan preserve their vital water source and protect the environment.',
    videoId: '625277165',
    thumbnailLink: 'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1267612408-4bf803e31de50879061009aba7ce3cb350e249c63411a50ce_295x166%3Fregion%3Dus&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
  },
]

function WhatsNew() {
  const [open, setOpen] = useState(false)
  
  return (
    <section className='pad-block-100'>
      <div data-ros='fade-down' className={cn("container flex-col gap-30")}>
        <h2 className='text-center'>What's New at <span className='textGreen'>Rural Rising</span></h2>
        <ul className={s.whatsNew}>
          {VIDEOS.map((vid) => (
            <li key={vid.id}>
              <button className={s.thumbnailCont} onClick={() => setOpen(vid.videoId)}>
                <img src={vid.thumbnailLink} alt="thumbnail" />
              </button>
              <h5 className='textYellow'>{vid.title}</h5>
              <p>{vid.description}</p>
            </li>
          ))}
        </ul>
        <Button
          text='View More'
          color='yellow'
          span
          role='link'
          style={{alignSelf: 'center'}}
          to='/in-the-news'
        />
      </div>
      {open !== false && <VideoPlayer onClose={() => setOpen(false)} videoId={open} />}
    </section>
  )
}

export default WhatsNew