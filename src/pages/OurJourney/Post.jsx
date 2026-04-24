import { Link } from'react-router'

import { formatDate, scrollReset } from '@/library/Util'

import s from './Post.module.scss'

function RecentPost({ posts }) {
  const firstJourney = posts.shift()
  const nextThree = posts.slice(0, 3)
  const remaining = posts.slice(3)
  
  return (
    <>
      <h5 data-ros='fade-right'>Recent Posts</h5>
      <div className='flex gap-20 w-100'>
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
                <div className={s.content}>
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

export default RecentPost