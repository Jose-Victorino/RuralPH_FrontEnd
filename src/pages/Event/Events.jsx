import { useNavigate, useSearchParams } from 'react-router'
import { useFormik } from 'formik'
import { eventHooks } from '@/service/crudService'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import EventCard from './EventCard'
import Loader from '@/components/Loader/Loader'

import s from './Events.module.scss'

const PAGE_NAME = 'Events'

function Event() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryParam = searchParams.get('query') ?? ''

  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)

  eventHooks.subscribe()

  const { data: { data: eventData = [] } = {}, isLoading, isPending } = eventHooks.getAll({
    search: {
      query: queryParam,
      columns: ['title'],
    }
  })

  const handleSearch = ({ searchQuery }) => {
    const trimmed = searchQuery.trim()
    navigate(trimmed ? `/events/s/?query=${trimmed}` : '/events')
  }
  
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: { searchQuery: queryParam },
    enableReinitialize: true,
    onSubmit: handleSearch
  })

  const handleInputChange = (e) => {
    handleChange(e)
    if (e.target.value === '') {
      navigate('/events')
    }
  }
  
  const renderEventList = (events, emptyMessage) => (
    <ul className='flex-col gap-30'>
      {events.length > 0
        ? events.map((e) => <EventCard key={e.id} {...e} />)
        : <p>{emptyMessage}</p>
      }
    </ul>
  )

  const renderContent = () => {
    if(isLoading || isPending){
      return (
        <div className='container flex-col gap-20'>
          <Loader />
        </div>
      )
    }

    if(queryParam){
      return (
        <div className='container flex-col gap-20'>
          {renderEventList(eventData, 'No events found')}
        </div>
      )
    }

    const now = new Date()
    const upcomingEvents = eventData.filter(event => new Date(event.date) >= now)
    const pastEvents = eventData.filter(event => new Date(event.date) < now)

    return (
      <>
        <div className='container flex-col gap-20'>
          <h3>Upcoming Events</h3>
          {renderEventList(upcomingEvents, 'No upcoming events')}
        </div>
        <div className='container flex-col gap-20'>
          <h3>Past Events</h3>
          {renderEventList(pastEvents, 'No past events')}
        </div>
      </>
    )
  }

  return (
    <>
      <section>
        <div className="container pad-block-20">
          <div className={s.header}>
            <form onSubmit={handleSubmit}>
              <input type="text" name='searchQuery' placeholder='Search...' value={values.searchQuery} onChange={handleInputChange} onBlur={handleBlur}/>
            </form>
          </div>
        </div>
      </section>
      <section className='flex-col gap-50'>
        {renderContent()}
      </section>
    </>
  )
}

export default Event