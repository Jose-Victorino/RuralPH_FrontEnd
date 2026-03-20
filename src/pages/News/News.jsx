import { useState } from 'react'
import cn from 'classnames'

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'

import s from './News.module.scss'

const PAGE_NAME = 'In The News'

const POSTS = [
  {
    postId: 1,
    title: 'Sagip-Saka: Rescuer of Distressed Farmers',
    description: 'Get the scoop on the Sagip Saka Act and find out how it’s helping farmers and fishermen increase their income, reach their full potential, and live a better life.',
    thumbnail: '',
    videoId: '752542075',
  },
  // {
  //   postId: 2,
  //   title: 'Farming is a social class',
  //   description: 'Discover how Rural Rising is reshaping the view of farming in society and giving farmers the recognition they deserve. Learn more about their efforts to transform rural areas into thriving communities.',
  //   thumbnail: '',
  //   videoId: '',
  // },
  // {
  //   postId: 3,
  //   title: 'How RuRi Began',
  //   description: 'Learn how RuRi came to be, what inspired its founders, and how they’re working to create a more sustainable future for farmers and consumers alike.',
  //   thumbnail: '',
  //   videoId: '',
  // },
  // {
  //   postId: 4,
  //   title: 'We receive a recognition',
  //   description: 'Find out how our pioneering work got recognized and awarded at the Ginebra Ako Year 4 Awards. Learn more about what this means for Rural Rising and all farmers across the country.',
  //   thumbnail: '',
  //   videoId: '',
  // },
  // {
  //   postId: 5,
  //   title: 'Farmers are pandemic front-liners',
  //   description: 'Learn how our farmers continue to be at the front lines of the pandemic and how we are supporting them at Rural Rising. Find out what else you can do to help Filipino farmers during this difficult time.',
  //   thumbnail: '',
  //   videoId: '',
  // },
  // {
  //   postId: 6,
  //   title: 'An Angel visits the farmers of Licab',
  //   description: 'Follow Rural Rising’s inspiring story of how they joined forces with Angel Locsin to bring aid and hope to the farmers of Licab. See how you can get involved and make a difference now.',
  //   thumbnail: '',
  //   videoId: '',
  // },
  // {
  //   postId: 7,
  //   title: 'Preserving amazing earth and vital water:',
  //   description: 'Learn how Rural Rising works with the local government and other key stakeholders to help farmers and their communities in Mt. Mingan preserve their vital water source and protect the environment.',
  //   thumbnail: '',
  //   videoId: '',
  // },
  // {
  //   postId: 8,
  //   title: 'How it all began',
  //   description: 'Discover the story behind Rural Rising and how its mission of connecting farmers to markets, services, and technologies began. Find out how you can join the movement and contribute to sustainable, inclusive development in the Philippines.',
  //   thumbnail: '',
  //   videoId: '',
  // },
  // {
  //   postId: 9,
  //   title: 'Why we call the truck Teddy',
  //   description: 'Learn how our truck “Teddy” is bringing fresh, locally sourced products from farms to your community. Discover why we chose this unique name and what it means for farmers everywhere!',
  //   thumbnail: '',
  //   videoId: '',
  // },
]

function News() {
  const [open, setOpen] = useState(false)
  document.title = `${PAGE_NAME} | Rural Rising PH`

  return (
    <>
      <section className='pad-block-50'>
        <div className='container flex-col gap-10'>
          <h3>Watch Our Latest Videos</h3>
          <ul className={s.gridList}>
            {POSTS.map(({postId, title, description, videoId}) => {
              
              return (
                <li key={postId} className={s.listItem}>
                  <div className={s.thumbnailCont} onClick={() => setOpen(videoId)}></div>
                  <h5>{title}</h5>
                  <p>{description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      {open !== false ? <VideoPlayer onClose={() => setOpen(false)} videoId={open} /> : <></>}
    </>
  )
}

export default News