import { useState, useEffect } from 'react'
import { newsService } from '@/service/crudService'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'
import Loader from '@/components/Loader/Loader'

import s from './News.module.scss'

const PAGE_NAME = 'In The News'

function News() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)
  
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await newsService.getAll()
      if(!error) setData(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <section className='pad-block-50'>
      <div className='container flex-col gap-10'>
        <h3>Watch Our Latest Videos</h3>
        {loading ? <Loader />
        : data.length > 0 ? (
          <ul className={s.gridList}>
            {data.map((news) => (
              <li key={news.id} className={s.listItem}>
                <button className={s.thumbnailCont} onClick={() => setOpen(news.video_id)}>
                  <img src={news.thumbnail_url} alt="thumbnail" />
                </button>
                <div className={s.content}>
                  <h5>{news.title}</h5>
                  <p className='display-description'>{news.description}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No news available</p>
        )}
      </div>
      {open !== false && <VideoPlayer onClose={() => setOpen(false)} videoId={open} />}
    </section>
  )
}

export default News