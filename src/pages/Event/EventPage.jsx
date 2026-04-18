import { useState, useEffect } from 'react'
import { Link, useParams } from'react-router'
import { createCRUD } from '@/service/crudService'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import { formatTime, scrollReset } from '@/library/Util'
import DateBanner from './DateBanner'
import Loader from '@/components/Loader/Loader'

import s from './EventPage.module.scss'

const PAGE_NAME = 'Events'
const service = createCRUD('event')

function EventPage() {
  const { eventId } = useParams()
  const [eventData, setEventData] = useState(null)
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await service.getById(eventId)
      if(!error) setEventData(data)
      setLoading(false)
    }
    
    fetchData()
  }, [eventId])

  const date = new Date(eventData?.date)
  const exactDate = `${date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })} (${date.toLocaleDateString('en-US', {
    weekday: 'long'
  })})`
  
  useDocumentTitle(`${eventData?.title ?? PAGE_NAME} | Rural Rising PH`)
  
  return (
    <section>
      <div className='container flex-col gap-10 pad-block-40' style={{minHeight: '420px'}}>
        <Link className={s.backBtn} to='/events' onClick={() => scrollReset()}>All Events</Link>
        {loading ? <Loader /> : (
          <>
            <div className={s.info}>
              {eventData ? (
                <>
                  <h3>{eventData.title}</h3>
                  <div className='flex gap-10'>
                    <DateBanner date={date}/>
                    <div className='flex-col j-center'>
                      <p>{exactDate}</p>
                      <p>{`${formatTime(eventData.time_start)}${eventData.time_end ? ` - ${formatTime(eventData.time_end)}`: ''}`}</p>
                    </div>
                  </div>
                  <div className='flex gap-5 a-center'>
                    <svg className={s.icon} width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>{eventData.location}</p>
                  </div>
                </>
              ) : (
                <p>Event not found</p>
              )}
            </div>
            <div>
              {eventData &&
                <>
                  <h5>Details</h5>
                  {eventData.description &&
                    <p>{eventData.description}</p>
                  }
                </>
              }
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default EventPage