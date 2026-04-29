import { Link, useParams } from'react-router'
import { eventHooks } from '@/service/crudService'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import { formatTime, scrollReset } from '@/library/Util'
import DateBanner from './DateBanner'
import Loader from '@/components/Loader/Loader'

import s from './EventPage.module.scss'

const PAGE_NAME = 'Events'

function EventPage() {
  const { eventId } = useParams()
  
  eventHooks.subscribe()
  
  const { data: { data: eventData = {} } = {}, isLoading, isPending } = eventHooks.getById(eventId)
  
  useDocumentTitle(`${eventData?.title ?? PAGE_NAME} | Rural Rising PH`)

  const date = new Date(eventData?.date)
  const exactDate = `${date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })} (${date.toLocaleDateString('en-US', {
    weekday: 'long'
  })})`
  
  return (
    <section>
      <div className='container flex-col gap-10 pad-block-40'>
        <Link className={s.backBtn} to='/events' onClick={() => scrollReset()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M105.4 297.4C92.9 309.9 92.9 330.2 105.4 342.7L265.4 502.7C277.9 515.2 298.2 515.2 310.7 502.7C323.2 490.2 323.2 469.9 310.7 457.4L173.3 320L310.6 182.6C323.1 170.1 323.1 149.8 310.6 137.3C298.1 124.8 277.8 124.8 265.3 137.3L105.3 297.3zM457.4 137.4L297.4 297.4C284.9 309.9 284.9 330.2 297.4 342.7L457.4 502.7C469.9 515.2 490.2 515.2 502.7 502.7C515.2 490.2 515.2 469.9 502.7 457.4L365.3 320L502.6 182.6C515.1 170.1 515.1 149.8 502.6 137.3C490.1 124.8 469.8 124.8 457.3 137.3z"/>
          </svg>
          All Events
        </Link>
        {(isLoading || isPending) ? <Loader /> : (
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
                    <p className='display-description'>{eventData.description}</p>
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