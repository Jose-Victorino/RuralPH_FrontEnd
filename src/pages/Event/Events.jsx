import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { createCRUD } from '@/service/crudService'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import EventCard from './EventCard'
import Loader from '@/components/Loader/Loader'

import s from './Events.module.scss'

const PAGE_NAME = 'Events'
const service = createCRUD('event')

function Event() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)

  const fetchData = async () => {
    const { data, error } = await service.getAll()
    if(!error) setData(data)
    setLoading(false)
  }
  
  useEffect(() => {
    fetchData()
    const unsubscribe = service.subscribeToChanges(fetchData)
    
    return () => unsubscribe()
  }, [])

  const handleSearch = ({searchBar}) => {
    if(searchBar === '') return
    
    console.log(searchBar)
  }
  
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: { searchBar: '' },
    onSubmit: handleSearch
  })
  
  const now = new Date()
  
  const upcomingEvents = data.filter(event => new Date(event.date) >= now)
  const pastEvents = data.filter(event => new Date(event.date) < now)

  return (
    <>
      <section>
        <div className="container pad-block-20">
          <div className={s.header}>
            <form onSubmit={handleSubmit}>
              <input type="text" name='searchBar' placeholder='Search...' value={values.searchBar} onChange={handleChange} onBlur={handleBlur}/>
            </form>
          </div>
        </div>
      </section>
      {loading ?
        <div style={{minHeight: '600px'}}>
          <div className='container flex-col gap-20'>
            <Loader />
          </div>
        </div> :
        <section className='flex-col gap-50 mb-50'>
          <div className='container flex-col gap-20'>
            <h3>Upcoming Events</h3>
              <ul className='flex-col gap-30'>
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((e) => (
                    <EventCard key={e.id} {...e}/>
                  ))
                ) : (
                  <p>No upcoming events</p>
                )}
              </ul>
          </div>
          <div className='container flex-col gap-20'>
            <h3>Past Events</h3>
              <ul className='flex-col gap-30'>
                {pastEvents.length > 0 ? (
                  pastEvents.map((e) => (
                    <EventCard key={e.id} {...e}/>
                  ))
                ) : (
                  <p>No past events</p>
                )}
              </ul>
          </div>
        </section>
      }
    </>
  )
}

export default Event