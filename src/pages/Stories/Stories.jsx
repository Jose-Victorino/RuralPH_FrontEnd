import { useState, useRef, useMemo, useCallback } from 'react'
import { Link } from 'react-router'
import { categoryHooks, storyHooks } from '@/service/crudService'
import { useFormik } from 'formik'
import cn from 'classnames'
import * as Yup from 'yup'

import useDocumentTitle from '@/hooks/useDocumentTitle'
import useQueryParams from '@/hooks/useQueryParams'

import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import { debounce, formatDate, scrollReset } from '@/library/Util'

import Loader from '@/components/Loader/Loader'

import s from './Stories.module.scss'

const PAGE_NAME = 'Stories'
const PAGE_SIZE = 10
const TAG_LIST = ['capecod', 'atcaperod']

const StoryMedia = ({media}) => {
  const moreMedia = Math.max(media.length - 4, 0)
  const imgContainerStyles = media.length === 1 ? {
    gridColumn: 'span 2',
    minHeight: 360,
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

const StoryFeed = ({ feedData, count, isFetching, page, setPage }) => {
  const [expandedIds, setExpandedIds] = useState(new Set())
  const observerRef = useRef(null)

  const hasMore = feedData.length < (count ?? 0)

  const sentinelRef = (node) => {
    if(observerRef.current) observerRef.current.disconnect()
    if(!node) return

    observerRef.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore && !isFetching)
        setPage(prev => prev + 1)
    })

    observerRef.current.observe(node)
  }
  
  const loadingMore = isFetching && page > 1

  const toggleExpanded = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const descriptionRef = useCallback((node) => {
    if(!node) return
    const btn = node.nextElementSibling
    if(node.scrollHeight <= node.clientHeight) {
      btn.style.display = 'none'
    }
  }, [])

  return (
    <>
      {!feedData.length ? <p className='text-center'>No stories found</p> :
        feedData.map((story) => {
          const isExpanded = expandedIds.has(story.id)

          return (
            <div data-ros='fade-up' key={story.id} className={cn('flex-col', s.storyItem)}>
              <Link to={`/story/${story.public_id}`} onClick={() => scrollReset()}>
                <div className={cn('flex-col gap-10 pad-15', s.txt)}>
                  <div>
                    <h5>{story.title}</h5>
                    <p className={s.date}>{formatDate(story.published_at)}</p>
                    {story.category && <p className={s.categoryLabel}>{story.category.name}</p>}
                  </div>
                  <div className='ql-override ql-snow flex-col'>
                    <div ref={descriptionRef} className={cn('ql-editor', !isExpanded && s.descriptionClamped)} dangerouslySetInnerHTML={{__html: story.description}} />
                    <button
                      className={s.showMoreBtn}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleExpanded(story.id)
                      }}
                    >
                      {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                  </div>
                </div>
                <StoryMedia media={story.story_media}/>
              </Link>
            </div>
          )
        }
      )}
      {loadingMore && <Loader />}
      {hasMore && <div ref={sentinelRef} style={{height: '40vh'}} />}
      {!hasMore && feedData.length > 0 &&
        <p className='text-center' style={{height: 160}}>No more stories</p>
      }
    </>
  )
}

function Stories() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useQueryParams({
    shape: {
      searchQuery: Yup.string().optional(),
      date: Yup.string().optional(),
      category: Yup.string().optional(),
      tag: Yup.string().optional(),
    }
  })
  const [isFilterChanged, setIsFilterChanging] = useState(false)

  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)

  const { data: { data: feedData = [], count } = {}, isLoading: feedLoading, isFetching, isError, error, refetch } = storyHooks.getStories({
    page: 1,
    pageSize: page * PAGE_SIZE,
    filters: {
      status: 'published',
      visibility: 'public',
    },
    searchQuery: query.searchQuery || undefined,
    date: query.date || undefined,
    category: query.category || undefined,
    hashtags: query.tag || undefined,
  }, {
    placeholderData: (prev) => prev,
    onSettled: () => setIsFilterChanging(false)
  })

  const { data: { data: categoryData = [] } = {}, isLoading: categoryLoading } = categoryHooks.getAll({
    order: { column: 'id', ascending: true }
  })

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { search: query?.searchQuery || '' },
    onSubmit: ({ search }) => {
      setQuery({searchQuery: search.trim()})
    }
  })

  const debouncedSetQuery = useMemo(() => {
    return debounce((value) => {
      setQuery({searchQuery: value.trim()})
      setIsFilterChanging(true)
      setPage(1)
    }, 700)
  }, [])
  const onChange = (e) => {
    handleChange(e)
    
    debouncedSetQuery(e.target.value)
  }

  const handleRetry = () => {
    setPage(1)
    refetch()
  }

  const applyFilter = (key, value) => {
    const newValue = query?.[key] === value ? '' : value

    setQuery({[key]: newValue})
    setIsFilterChanging(true)
    setPage(1)
  }

  const dateChange = (dateOnly) => {
    setQuery({
      date: dateOnly
      ? new Date(dateOnly).toISOString().split('T')[0]
      : undefined
    })
    setIsFilterChanging(true)
    setPage(1)
  }

  return (
    <div className={cn('container pad-block-40', s.container)}>
      <aside className={cn('flex-col gap-20', s.aside)}>
        <form onSubmit={handleSubmit}>
          <Input role='search' type='text' name='search' value={values.search} onChange={onChange} placeholder='Search...' />
        </form>
        <div>
          <Input type='date' value={query?.date || ''} onChange={(e) => dateChange(e.target.value)}/>
        </div>
        {categoryLoading
          ? <div className='flex-col gap-10'>
              <h5>Category</h5>
              <Loader />
            </div>
          : categoryData?.length ?
            <div className='flex-col gap-10'>
              <h5>Category</h5>
              <ul className={s.filterOptionList} data-filter-type='category'>
                {categoryData.map((c) =>
                  <li key={c.id} className='flex'>
                    <button
                      type='button'
                      role='button'
                      className={cn({[s.selected]: query.category === c.slug})}
                      onClick={() => applyFilter('category', c.slug)}
                    >
                      {c.name}
                    </button>
                  </li>
                )}
              </ul>
            </div> : null
        }
        <div className='flex-col gap-10'>
          <h5>Suggested Tags</h5>
          <ul className={s.filterOptionList} data-filter-type='tag'>
            {TAG_LIST.map((tag) =>
              <li key={tag} className='flex'>
                <button
                  type='button'
                  role='button'
                  className={cn({[s.selected]: query.tag === tag})}
                  onClick={() => applyFilter('tag', tag)}
                >
                  {`#${tag}`}
                </button>
              </li>
            )}
          </ul>
        </div>
      </aside>
      {feedLoading || (isFilterChanged && isFetching) ? <Loader /> :
        <section className='flex-col gap-20'>
          {isError ?
            <div className={cn('flex-col a-center gap-10', s.errorState)}>
              <p>{error.message}</p>
              <Button text='Try Again' onClick={handleRetry} />
            </div>
            : <>
              <StoryFeed {...{feedData, count, isFetching, page, setPage}}/>
            </>
          }
        </section>
      }
      <div />
    </div>
  )
}

export default Stories