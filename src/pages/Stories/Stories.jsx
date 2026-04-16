import { useState, useEffect, useRef, useCallback } from 'react'
import { createCRUD } from '@/service/crudService'
import cn from 'classnames'

import Navigation from '@/components/Navigation/Navigation'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { formatDate } from '@/library/Util'

import Loader from '@/components/Loader/Loader'

import s from './Stories.module.scss'

const PAGE_NAME = 'Stories'
const CHAR_LIMIT = 200
const PAGE_SIZE = 10

const service = createCRUD('story', {
  defaultSelect: '*, story_media(id, media_path)'
})

const shareSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M371.8 82.4C359.8 87.4 352 99 352 112L352 192L240 192C142.8 192 64 270.8 64 368C64 481.3 145.5 531.9 164.2 542.1C166.7 543.5 169.5 544 172.3 544C183.2 544 192 535.1 192 524.3C192 516.8 187.7 509.9 182.2 504.8C172.8 496 160 478.4 160 448.1C160 395.1 203 352.1 256 352.1L352 352.1L352 432.1C352 445 359.8 456.7 371.8 461.7C383.8 466.7 397.5 463.9 406.7 454.8L566.7 294.8C579.2 282.3 579.2 262 566.7 249.5L406.7 89.5C397.5 80.3 383.8 77.6 371.8 82.6z"/></svg>

const StoryDescription = ({ text }) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = text?.length > CHAR_LIMIT

  return (
    <p>
      {isLong && !expanded ? text.slice(0, CHAR_LIMIT) + '...' : text}
      {isLong && (
        <span
          className={s.seeMoreBtn}
          onClick={() => setExpanded(prev => !prev)}
        >
          {expanded ? 'See less' : 'See more'}
        </span>
      )}
    </p>
  )
}

function Stories() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [loadingMore, setLoadingMore] = useState(false)
  const [_, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef(null)

  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)

  const fetchPage = useCallback(async (pageNum) => {
    const isFirst = pageNum === 1
    isFirst ? setLoading(true) : setLoadingMore(true)

    const { data: newData, count, error } = await service.getPage({ page: pageNum, pageSize: PAGE_SIZE })

    if(error){
      setError('Failed to load stories. Please try again.')
    } else{
      setData(prev => isFirst ? newData : [...prev, ...newData])
      setHasMore(pageNum * PAGE_SIZE < count)
    }

    isFirst ? setLoading(false) : setLoadingMore(false)
  }, [])

  useEffect(() => { fetchPage(1) }, [])

  const sentinelRef = useCallback((node) => {
    if(observerRef.current) observerRef.current.disconnect()
    if(!node) return

    observerRef.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore && !loadingMore) {
        setPage(prev => {
          const next = prev + 1
          fetchPage(next)
          return next
        })
      }
    })

    observerRef.current.observe(node)
  }, [hasMore, loadingMore, fetchPage])
  
  return (
    <>
      <Navigation />
      <section className='pad-block-50'>
        <div className={cn(s.container, 'flex-col gap-20')}>
          {loading ? <Loader /> : error ? (
            <div className={cn('flex-col a-center gap-10', s.errorState)}>
              <p>{error}</p>
              <Button text='Try Again' onClick={() => fetchPage(1)} span />
            </div>
          ) :  
            <>
              {data.map((story) => (
                <div key={story.id} className={cn('flex-col', s.storyItem)}>
                  <div className='flex-col gap-10 pad-20'>
                    <div>
                      <h5>{story.title}</h5>
                      <p className={s.date}>{formatDate(story.created_at)}</p>
                    </div>
                    <StoryDescription text={story.description} />
                  </div>
                  <div className='flex j-center'>
                    <div className={s.imgCont}>
                      {story.story_media.map((media) => (<div key={media.id}></div>))}
                    </div>
                  </div>
                </div>
              ))}
              {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
              {loadingMore && <Loader />}
              {!hasMore && data.length > 0 &&
                <p className='text-center'>No more stories</p>
              }
            </>
          }
        </div>
      </section>
    </>
  )
}

export default Stories