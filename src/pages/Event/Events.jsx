import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { createCRUD } from '@/service/crudService'
import cn from 'classnames'

import EventCard from './EventCard'

import s from './Events.module.scss'

const PAGE_NAME = 'Events'
const eventService = createCRUD('event')

function Event() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  document.title = `${PAGE_NAME} | Rural Rising PH`

  const fetchData = async () => await eventService.getAll(setLoading, setData)
  
  useEffect(() => {
    fetchData()
  }, [])

  const handleSearch = ({searchBar}) => {
    if(searchBar === '') return
    
    console.log(searchBar)
  }
  
  const now = new Date()
  
  const upcomingEvents = data.filter(event => new Date(event.date) >= now)
  const pastEvents = data.filter(event => new Date(event.date) < now)

  return (
    <>
      <section>
        <div className="container pad-block-20">
          <div data-ros='fade-down' className={s.header}>
            <Formik
              initialValues={{
                searchBar: ''
              }}
              onSubmit={handleSearch}
            >
              <Form>
                <Field type="text" name='searchBar' placeholder='Search...'/>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
      <section data-ros='fade-right' className='flex-col gap-50 mb-50'>
        <div className='container flex-col gap-20'>
          <h3>Upcoming Events</h3>
            <ul className='flex-col gap-30'>
              {loading ? (
                <span>Loading...</span>
              ) : upcomingEvents.length > 0 ? (
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
              {loading ? (
                <span>Loading...</span>
              ) : pastEvents.length > 0 ? (
                pastEvents.map((e) => (
                  <EventCard key={e.id} {...e}/>
                ))
              ) : (
                <p>No past events</p>
              )}
            </ul>
        </div>
      </section>
    </>
  )
}

export default Event