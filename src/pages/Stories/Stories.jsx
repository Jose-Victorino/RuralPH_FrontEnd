import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router'
import { storyHooks } from '@/service/crudService'
import cn from 'classnames'

import Navigation from '@/components/Navigation/Navigation'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import Button from '@/components/Button/Button'
import { formatDate, scrollReset } from '@/library/Util'

import Loader from '@/components/Loader/Loader'

import s from './Stories.module.scss'

const PAGE_NAME = 'Stories'
const CHAR_LIMIT = 160
const PAGE_SIZE = 10

const StoryDescription = ({ text }) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = text?.length > CHAR_LIMIT

  return (
    <p className='display-description'>
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

const StoryMedia = ({media}) => {
  const moreMedia = Math.max(media.length - 4, 0)
  const imgContainerStyles = media.length === 1 ? {
    gridColumn: 'span 2',
    maxHeight: 430,
  } : {
    aspectRatio: 1,
  }

  return (
    <div className={s.mediaGrid}>
      {media.slice(0, 4).map((m, i) =>
        <div key={m.id} style={imgContainerStyles}>
          <img src={m.media_path} alt="Story Media" />
          {(moreMedia && i === 3) ?
            <div className={s.mediaOverlay}>
              <p>{`+${moreMedia}`}</p>
            </div>
            : null
          }
        </div>
      )}
    </div>
  )
}

function Stories() {
  const [page, setPage] = useState(1)
  const observerRef = useRef(null)

  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)

  const { data: result, isLoading, isFetching, isError, refetch } = storyHooks.getAll(
    { page: 1, pageSize: page * PAGE_SIZE },
    { placeholderData: (prev) => prev },
  )

  const allData = result?.data ?? []
  const hasMore = allData.length < (result?.count ?? 0)

  const handleRetry = () => {
    setPage(1)
    refetch()
  }

  const sentinelRef = useCallback((node) => {
    if(observerRef.current) observerRef.current.disconnect()
    if(!node) return

    observerRef.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore && !isFetching)
        setPage(prev => prev + 1)
    })

    observerRef.current.observe(node)
  }, [hasMore, isFetching])
  
  const loadingMore = isFetching && page > 1

  return (
    <>
      <Navigation />
      <main style={{ minHeight: '80vh', paddingTop: 'var(--navigation-height, 110px)'}}>
        <section className='pad-block-50'>
          <div className={cn(s.container, 'flex-col gap-20')}>
            {isLoading ? <Loader /> : isError ? (
              <div className={cn('flex-col a-center gap-10', s.errorState)}>
                <p>{isError}</p>
                <Button text='Try Again' onClick={handleRetry} span />
              </div>
            ) :
              <>
                {allData.map((story) =>
                  <div data-ros='fade-up' key={story.id} className={cn('flex-col', s.storyItem)}>
                    <div className='flex-col gap-10 pad-15'>
                      <Link to={`/stories/${story.id}`} onClick={() => scrollReset()}>
                        <h5>{story.title}</h5>
                        <p className={s.date}>{formatDate(story.created_at)}</p>
                      </Link>
                      <StoryDescription text={story.description}/>
                    </div>
                    <Link to={`/stories/${story.id}`} onClick={() => scrollReset()}>
                      <StoryMedia media={story.story_media}/>
                    </Link>
                  </div>
                )}
                {loadingMore && <Loader />}
                {hasMore && <div ref={sentinelRef} style={{height: '40vh'}} />}
                {!hasMore && allData.length > 0 &&
                  <p className='text-center' style={{height: 160}}>No more stories</p>
                }
              </>
            }
          </div>
        </section>
      </main>
    </>
  )
}

export default Stories