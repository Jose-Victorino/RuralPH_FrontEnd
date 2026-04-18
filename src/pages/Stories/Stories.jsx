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
  useEffect(() => {
    fetchPage(1)
  }, [])

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