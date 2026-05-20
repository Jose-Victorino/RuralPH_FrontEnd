import { Link } from'react-router'
import { journeyHooks } from '@/service/crudService'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import { formatDate, scrollReset } from '@/library/Util'
import Loader from '@/components/Loader/Loader'

import s from './OurJourney.module.scss'
import cn from 'classnames'

const PAGE_NAME = 'Our Journey'

function Post({ posts }) {
  const [firstJourney, ...restPosts] = posts
  const nextThree = restPosts.slice(0, 3)
  const remaining = restPosts.slice(3)
  
  return (
    <>
      <h3 data-ros='fade-right'>Our Journey</h3>
      <div className={cn('flex gap-30 w-100', s.journeyPosts)}>
        <div data-ros='fade-right' className={s.mainPost}>
          <Link to={`/our-journey/p/${firstJourney.id}`} onClick={() => scrollReset()}>
            <div className={s.imageCont}>
              <img className={s.img} src={firstJourney.image_path} loading='lazy' alt={firstJourney.title} />
            </div>
            <div>
              <h5>{firstJourney.title}</h5>
              <p>{formatDate(firstJourney.created_at)}</p>
            </div>
          </Link>
        </div>
        <ul data-ros='fade-left' className={s.recentPostList}>
          {nextThree.map((row) => (
            <li key={row.id}>
              <Link to={`/our-journey/p/${row.id}`} onClick={() => scrollReset()}>
                <div className={s.imageCont}>
                  <img className={s.img} src={row.image_path} loading='lazy' alt={row.title} />
                </div>
                <div className={s.details}>
                  <h5>{row.title}</h5>
                  <p>{formatDate(row.created_at)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {remaining.length > 0 &&
        <div>
          <ul className={s.postList}>
            {remaining.map((row) =>
              <li key={row.id}>
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
            )}
          </ul>
        </div>
      }
    </>
  )
}

function OurJourney() {
  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)

  const { data: { data: journeyData = [] } = {}, isLoading, isError, error } = journeyHooks.getAll()

  return (
    <>
      <section className='pad-block-40'>
        <div className='container flex-col gap-20 pad-block-20' style={{minHeight: '60vh'}}>
          {isLoading ? <Loader /> :
            isError ?
              <p className='text-center'>{error.message}</p> :
            !journeyData.length ?
              <p className='text-center'>No post available</p> :
              <Post posts={journeyData}/>
          }
        </div>
      </section>
      <section className='pad-block-40'>
        <div data-ros='fade-down' className="container flex-col gap-15 text-center">
          <h2 className='textGreen'>Growing Together for a Sustainable Future</h2>
          <h4>Mission, history, farmer spotlights, and BTS.</h4>
          <p>Learn & Explore <br /> Tips, Recipes, and Resources</p>
        </div>
      </section>
    </>
  )
}

export default OurJourney