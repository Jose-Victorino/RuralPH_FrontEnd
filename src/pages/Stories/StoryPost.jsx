import { useState, useEffect, Fragment } from 'react'
import { useNavigate, Link, useParams } from 'react-router'
import { createCRUD } from '@/service/crudService'
import cn from 'classnames'

import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import Button from '@/components/Button/Button'
import { formatDate } from '@/library/Util'

import Loader from '@/components/Loader/Loader'

import s from './Stories.module.scss'

const PAGE_NAME = 'Story'
const service = createCRUD('story', {
  defaultSelect: '*, story_media(id, media_path)'
})

function StoryPost() {
  const { storyId } = useParams()
  const [storyData, setStoryData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await service.getById(storyId)
      if(!error) setStoryData(data)
      setLoading(false)
    }
    
    fetchData()
  }, [storyId])

  return (
    <>
      <Navigation />
      <main className='container-parent' style={{ minHeight: '80vh', paddingTop: 'var(--navigation-height, 110px)'}}>
        <section className='container pad-block-50'>
          <Link className={s.backBtn} to='/stories' onClick={() => scrollReset()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M105.4 297.4C92.9 309.9 92.9 330.2 105.4 342.7L265.4 502.7C277.9 515.2 298.2 515.2 310.7 502.7C323.2 490.2 323.2 469.9 310.7 457.4L173.3 320L310.6 182.6C323.1 170.1 323.1 149.8 310.6 137.3C298.1 124.8 277.8 124.8 265.3 137.3L105.3 297.3zM457.4 137.4L297.4 297.4C284.9 309.9 284.9 330.2 297.4 342.7L457.4 502.7C469.9 515.2 490.2 515.2 502.7 502.7C515.2 490.2 515.2 469.9 502.7 457.4L365.3 320L502.6 182.6C515.1 170.1 515.1 149.8 502.6 137.3C490.1 124.8 469.8 124.8 457.3 137.3z"/>
            </svg>
            All Stories
          </Link>
          {loading ? <Loader /> :
            storyData ?
              <div className='flex-col gap-20'>
                <div>
                  <h4>{storyData.title}</h4>
                  <p className={s.date}>{formatDate(storyData.created_at)}</p>
                </div>
                <p>{storyData.description}</p>
                <ul className={s.mediaList}>
                  {storyData.story_media.map((media) =>
                    <li key={media.id}>
                      <img src={media.media_path} alt="Story Media" />
                    </li>
                  )}
                </ul>
              </div>
            : <p>Story not found</p>
          }
        </section>
      </main>
      <Footer />
    </>
  )
}

export default StoryPost