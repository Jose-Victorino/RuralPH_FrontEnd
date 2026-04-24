import { useState, useEffect } from 'react'
import { Link, useParams } from'react-router'
import { useGlobal } from '@/context/GlobalContext'
import { journeyService } from '@/service/crudService'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import Loader from '@/components/Loader/Loader'

import { formatDate, scrollReset } from '@/library/Util'

import s from './JourneyPost.module.scss'

import facebook from '@/assets/svg/facebook.svg'
import xTwitter from '@/assets/svg/x-twitter.svg'
import linkedin from '@/assets/svg/linkedin.svg'

const PAGE_NAME = 'Our Journey'

function Post() {
  const { postId } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [recentPosts, setRecentPosts] = useState([])

  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)
  
  useEffect(() => {
    const fetchData = async () => {
      const [{ data: post, error }, { data: recent }] = await Promise.all([
        journeyService.getById(postId),
        journeyService.getRecent(postId),
      ])

      if (!error) setData(post)
      setRecentPosts(recent ?? [])
      setLoading(false)
    }

    fetchData()
  }, [postId])

  return (loading ?
    <section>
      <div className='container pad-block-20'>
        <Loader />
      </div>
    </section> :
    data ?
    <>
      <section>
        <div className="container flex-col gap-10 pad-block-20">
          <div className={s.backLink} onClick={() => scrollReset()}>
            <Link to='/our-journey' className='flex a-center'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M105.4 297.4C92.9 309.9 92.9 330.2 105.4 342.7L265.4 502.7C277.9 515.2 298.2 515.2 310.7 502.7C323.2 490.2 323.2 469.9 310.7 457.4L173.3 320L310.6 182.6C323.1 170.1 323.1 149.8 310.6 137.3C298.1 124.8 277.8 124.8 265.3 137.3L105.3 297.3zM457.4 137.4L297.4 297.4C284.9 309.9 284.9 330.2 297.4 342.7L457.4 502.7C469.9 515.2 490.2 515.2 502.7 502.7C515.2 490.2 515.2 469.9 502.7 457.4L365.3 320L502.6 182.6C515.1 170.1 515.1 149.8 502.6 137.3C490.1 124.8 469.8 124.8 457.3 137.3z"/>
              </svg>
              Go back
            </Link>
          </div>
          <div className={s.header}>
            <div>
              <h3 className='textGreen'>{data.title}</h3>
              <p>{formatDate(data.created_at)}</p>
            </div>
            <ul className='flex a-end gap-10'>
              <li className='flex'>
                <Link to=''>
                  <img src={facebook} height='24' width='24' loading='lazy' alt="Facebook" />
                </Link>
              </li>
              <li className='flex'>
                <Link to=''>
                  <img src={xTwitter} height='24' width='24' loading='lazy' alt="X" />
                </Link>
              </li>
              <li className='flex'>
                <Link to=''>
                  <img src={linkedin} height='24' width='24' loading='lazy' alt="Linkedin" />
                </Link>
              </li>
            </ul>
          </div>
          <hr />
          <div className={s.imageCont}>
            <img className={s.img} src={data.image_path} loading='lazy' alt={data.title} />
          </div>
          <div>
            <p className='display-description'>{data.description}</p>
          </div>
        </div>
      </section>
      <section>
        <div className="container flex-col gap-10 pad-block-50">
          <h3>Recent Posts</h3>
          <ul className={s.postList}>
            {recentPosts.map((row) => (
              <li key={row.id} className={s.postItem}>
                <Link to={`/our-journey/p/${row.id}`} onClick={() => scrollReset()}>
                  <div className={s.imageCont}>
                    <img className={s.img} src={row.image_path} loading='lazy' alt={row.title} />
                  </div>
                  <div className={s.content}>
                    <h5>{row.title}</h5>
                    <p>{formatDate(row.created_at)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </> :
    <section>
      <div className='container pad-block-20 text-center'>
        <p>Post not found</p>
      </div>
    </section>
  )
}

export default Post