import { Link, useParams } from'react-router'
import { journeyHooks } from '@/service/crudService'

import Loader from '@/components/Loader/Loader'
import Top from './Top'

import { scrollReset } from '@/library/Util'

import s from './JourneyCategory.module.scss'

function JourneyCategory() {
  const { categoryId } = useParams()

  const { data: { data: journeyData = [] } = {}, isLoading, isPending } = journeyHooks.getAll({ filters: [{ column: 'category_id', value: categoryId }] })

  return (
    <section>
      <div className='container flex-col gap-20 pad-block-20'>
      {(isLoading || isPending) ? <Loader />
      : journeyData.length > 0 ?
        <>
          <Top />
          <ul data-ros='fade-down' className={s.postList}>
            {journeyData.map((row) =>
              <li key={row.id}>
                <Link to={`/our-journey/p/${row.id}`} onClick={() => scrollReset()}>
                  <div className={s.imageCont}>
                    <img className={s.img} src={row.image_path} loading='lazy' alt={row.title} />
                  </div>
                  <div className={s.content}>
                    <h5>{row.title}</h5>
                    <p>{row.posted_at}</p>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </>
        : <p className='text-center'>No post found</p>
      }
      </div>
    </section>
  )
}

export default JourneyCategory