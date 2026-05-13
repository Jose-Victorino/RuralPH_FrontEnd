import { Link, useParams } from'react-router'
import { journeyHooks } from '@/service/crudService'

import Loader from '@/components/Loader/Loader'
import Top from './Top'

import { scrollReset } from '@/library/Util'

import s from './JourneyCategory.module.scss'

function JourneyCategory() {
  const { categoryId } = useParams()

  const { data: { data: journeyData = [] } = {}, isLoading, isError, error } = journeyHooks.getAll({
    filters: {
      category_id: categoryId
    }
  })

  const LoadData = () => {
    if(isLoading) return <Loader />

    if(isError) return <p className='text-center'>{error.message}</p>

    if(!journeyData.length) return <p className='text-center'>No post available</p>

    return (
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
    )
  }

  return (
    <section>
      <div className='container flex-col gap-20 pad-block-20'>
        <LoadData />
      </div>
    </section>
  )
}

export default JourneyCategory