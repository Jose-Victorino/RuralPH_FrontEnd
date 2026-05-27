import { useState } from 'react'
import { newsHooks } from '@/service/crudService'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'
import Loader from '@/components/Loader/Loader'

import s from './News.module.scss'

const PAGE_NAME = 'In The News'

function News() {
  const [open, setOpen] = useState(false)

  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)

  const { data: { data: newsData = [] } = {}, isLoading, isError, error } = newsHooks.getAll()

  return (
    <section className='pad-block-50'>
      <div className='container flex-col gap-10'>
        <h3>Watch Our Latest Videos</h3>
        {isLoading ? <Loader /> :
          isError ?
            <p className='text-center'>{error.message}</p> :
          !newsData?.length ?
            <p className='text-center'>No news available</p> :
            <ul className={s.gridList}>
              {newsData.map((news) => (
                <li key={news.id} className={s.listItem}>
                  <button className={s.thumbnailCont} onClick={() => setOpen(news.video_id)}>
                    <img src={news.thumbnail_url} alt="thumbnail" />
                  </button>
                  <div className={s.content}>
                    <h5>{news.title}</h5>
                    <p>{news.description}</p>
                  </div>
                </li>
              ))}
            </ul>
        }
      </div>
      {open !== false && <VideoPlayer onClose={() => setOpen(false)} videoId={open} />}
    </section>
  )
}

export default News