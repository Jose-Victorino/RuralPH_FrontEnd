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

const StoryFeed = ({ storyData, count, isFetching, page, setPage }) => {
  const [expandedIds, setExpandedIds] = useState(new Set())
  const observerRef = useRef(null)

  const hasMore = storyData.length < (count ?? 0)

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
    if (!node) return
    const btn = node.nextElementSibling
    if (node.scrollHeight <= node.clientHeight) {
      btn.style.display = 'none'
    }
  }, [])

  return (
    <>
      {!storyData.length ? <p className='text-center'>No stories found</p> :
        storyData.map((story) => {
          const isExpanded = expandedIds.has(story.id)

          return (
            <div data-ros='fade-up' key={story.id} className={cn('flex-col', s.storyItem)}>
              <Link to={`/story/${story.id}`} onClick={() => scrollReset()}>
                <div className='flex-col gap-10 pad-15'>
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
      {!hasMore && storyData.length > 0 &&
        <p className='text-center' style={{height: 160}}>No more stories</p>
      }
    </>
  )
}

/**
 * TODO: Add filters
 * - date
 * 
 * TODO: UI addition / changes
 */
function Stories() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useQueryParams({
    shape: {
      searchQuery: Yup.string().optional(),
      tag: Yup.string().optional(),
      category: Yup.string().optional(),
      date: Yup.date().optional(),
    },
  })

  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)
  
  const { data: { data: storyData = [], count } = {}, isLoading, isFetching, isError, refetch } = storyHooks.getStories({
    page: 1,
    pageSize: page * PAGE_SIZE,
    filters: { status: 'published' },
    category: query.category || undefined,
    hashtags: query.tag || undefined,
    searchQuery: query.searchQuery || undefined,
  }, { placeholderData: (prev) => prev })

  const { data: { data: categoryData = [] } = {} } = categoryHooks.getAll({
    order: { column: 'id', ascending: true }
  })

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { search: '' },
    onSubmit: ({ search }) => {
      setQuery({searchQuery: search.trim()})
    }
  })
  const debouncedSetQuery = useMemo(() => {
    return debounce((value) => {
      setQuery({searchQuery: value.trim()})
    }, 700)
  }, [])
  const onChange = (e) => {
    handleChange(e)
    
    debouncedSetQuery(e.target.value)
  }

  const applyFilter = (key, value) => {
    const newValue = query?.[key] === value ? '' : value

    setQuery({[key]: newValue})
  }

  const handleRetry = () => {
    setPage(1)
    refetch()
  }

  return isLoading ? <div className='container pad-block-40' style={{height: '90vh'}}><Loader /></div> : (
    <div className={cn('container', s.container)}>
      <aside className={cn('flex-col gap-20 pad-block-40', s.aside)}>
        <form  onSubmit={handleSubmit}>
          <Input type='text' name='search' value={values.search} onChange={onChange} placeholder='Search...' />
        </form>
        {categoryData?.length ?
          <div className='flex-col gap-10'>
            <h5>Category</h5>
            <ul className={s.filterOptionList}>
              {categoryData.map((c) =>
                <li key={c.id}>
                  <button
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
          <ul className={s.filterOptionList}>
            {TAG_LIST.map((tag) =>
              <li key={tag}>
                <button
                  className={cn({[s.selected]: query.tag === tag})}
                  onClick={() => applyFilter('tag', tag)}
                >
                  {tag}
                </button>
              </li>
            )}
          </ul>
        </div>
      </aside>
      <section className='flex-col gap-20 pad-block-40'>
        {isError ?
          <div className={cn('flex-col a-center gap-10', s.errorState)}>
            <p>{isError}</p>
            <Button text='Try Again' onClick={handleRetry} />
          </div>
          : <StoryFeed {...{storyData, count, isFetching, page, setPage}}/>
        }
      </section>
      <div />
    </div>
  )
}

export default Stories