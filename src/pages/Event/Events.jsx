import React from 'react'
import { Link } from'react-router-dom'
import cn from 'classnames'
import { Formik, Form, Field } from 'formik'

import EventCard from './EventCard'

import s from './Events.module.scss'

const PAGE_NAME = 'Events'

function Event() {
  document.title = `${PAGE_NAME} | Rural Rising PH`

  const handleSearch = ({searchBar}) => {
    if(searchBar === '') return
    
    console.log(searchBar);
  }

  return (
    <>
      <section>
        <div className="container pad-block-20">
          <div className={s.header}>
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
      <section className='flex-col gap-50 mb-50'>
        <div className='container flex-col gap-20'>
          <h3>Upcoming Events</h3>
            <ul className='flex-col gap-30'>
              <EventCard />
              <EventCard />
              <EventCard />
            </ul>
        </div>
        <div className='container flex-col gap-20'>
          <h3>Past Events</h3>
            <ul className='flex-col gap-30'>
              <EventCard />
              <EventCard />
              <EventCard />
            </ul>
        </div>
      </section>
    </>
  )
}

export default Event