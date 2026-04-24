import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useFormik } from 'formik'
import { eventService } from '@/service/crudService'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import EventCard from './EventCard'
import Loader from '@/components/Loader/Loader'

import s from './Events.module.scss'

const PAGE_NAME = 'Events'

function Event() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const queryParam = searchParams.get('query') ?? ''

  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data, error } = await eventService.search({
        query: queryParam,
        columns: ['title', 'description'],
      })
      if(!error) setData(data)
      setLoading(false)
    }
    fetchData()
  }, [queryParam])

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
    if(loading){
      return (
        <div className='container flex-col gap-20'>
          <Loader />
        </div>
      )
    }

    if(queryParam){
      return (
        <div className='container flex-col gap-20'>
          {renderEventList(data, 'No events found')}
        </div>
      )
    }

    const now = new Date()
    const upcomingEvents = data.filter(event => new Date(event.date) >= now)
    const pastEvents = data.filter(event => new Date(event.date) < now)

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