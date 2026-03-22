import { useState, useEffect } from 'react'
import { createCRUD } from '@/service/crudService'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'

import s from './News.module.scss'

const PAGE_NAME = 'In The News'
const newsService = createCRUD('news')

function News() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)
  
  const fetchData = async () => await newsService.getAll(setLoading, setData)
  
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section className='pad-block-50'>
      <div className='container flex-col gap-10' style={{ minHeight: '400px'}}>
        <h3>Watch Our Latest Videos</h3>
        <ul className={s.gridList}>
          {loading ? (
            <span>Loading...</span>
          ) : data.length > 0 ? (
            data.map((news) => (
              <li key={news.id} className={s.listItem}>
                <button className={s.thumbnailCont} onClick={() => setOpen(news.video_id)}>
                  <img className={s.img} src={news.thumbnail_url} alt="thumbnail" />
                </button>
                <h5>{news.title}</h5>
                <p>{news.description}</p>
              </li>
            ))
          ) : (
            <p>No news available</p>
          )}
        </ul>
      </div>
      {open !== false && <VideoPlayer onClose={() => setOpen(false)} videoId={open} />}
    </section>
  )
}

export default News