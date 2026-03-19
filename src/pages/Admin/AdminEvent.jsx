import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { formatDate, formatTime } from '@/library/Util'
import { createCRUD } from './crudService'
import { toast } from 'react-toastify'

import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'
import Breadcrumbs from './Breadcrumbs'

import s from './AdminEvent.module.scss'

const schema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  location: Yup.string().required('Location is required'),
  date: Yup.date().required('Date is required'),
  time_start: Yup.string().required('Start time is required'),
  time_end: Yup.string(),
})
const emptyFormValues = {
  title: '',
  description: '',
  location: '',
  date: '',
  time_start: '',
  time_end: '',
}

const TABLE_NAME = 'event'
const eventService = createCRUD(TABLE_NAME)

function AdminEvent() {
  const [modalState, setModalState] = useState(false)
  const [eventsData, setEventsData] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  
  document.title = `Event | Admin | Rural Rising PH`
  
  const fetchEvents = async () => await eventService.getData(setLoading, setEventsData)
  
  useEffect(() => {
    fetchEvents()
  }, [])

  const handleModalSubmit = async (values, { setSubmitting }) => {
    const payload = {
      title: values.title,
      description: values.description || null,
      location: values.location,
      date: values.date,
      time_start: values.time_start,
      time_end: values.time_end || null,
    }

    const { error } = modalState === 'INSERT' ?
      await eventService.addData(payload) :
      await eventService.updateData(payload, selectedEvent.id)
    
    setSubmitting(false)
    if(error){
      toast.error('An error occurred')
      console.error(`Error saving ${TABLE_NAME}: `, error.message)
      return
    }
    toast.success(`${TABLE_NAME} has been added`)
    closeModal()
    fetchEvents()
  }

  const handleDelete = async (id) => await eventService.deleteData(id, fetchEvents)

  const openCreateModal = () => {
    setSelectedEvent(null)
    setModalState('INSERT')
  }
  const openEditModal = (event) => {
    setSelectedEvent(event)
    setModalState('UPDATE')
  }
  const closeModal = () => {
    setModalState(null)
    setSelectedEvent(null)
  }
  
  const EventModal = () => {
    const initialValues = modalState === 'UPDATE' && selectedEvent ? {
      title: selectedEvent.title ?? '',
      description: selectedEvent.description ?? '',
      location: selectedEvent.location ?? '',
      date: selectedEvent.date ?? '',
      time_start: selectedEvent.time_start ?? '',
      time_end: selectedEvent.time_end ?? '',
    } : emptyFormValues

    return (
      <Modal
        onClose={() => setModalState(false)}
        width='480px'
        height='600px'
      >
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          enableReinitialize
          onSubmit={handleModalSubmit}
        >
          {({ errors, isSubmitting }) => (
            <Form className='flex-col gap-15'>
              <Input displayName='Title' error={errors.title} input={{ type: 'text', name:'title', id:'title', required: true }}/>
              <Input displayName='Description' error={errors.description} input={{ type: 'text', name:'description', id:'description', required: false }}/>
              <Input displayName='Location' error={errors.location} input={{ type: 'text', name:'location', id:'location', required: true }}/>
              <Input displayName='Date' error={errors.date} input={{ type: 'date', name:'date', id:'date', required: true }}/>
              <Input displayName='Time Start' error={errors.time_start} input={{ type: 'time', name:'time_start', id:'time_start', required: true }}/>
              <Input displayName='Time End' error={errors.time_end} input={{ type: 'time', name:'time_end', id:'time_end', required: false }}/>
              <Button type='submit' text='Submit' disabled={isSubmitting} />
            </Form>
          )}
        </Formik>
      </Modal>
    )
  }

  return (
    <div className={s.container}>
      <Breadcrumbs crumbs={[
        {
          text: 'Home',
          path: '/admin',
        },
        {
          text: 'Event',
          path: '/admin/event',
        }
      ]}/>
      <section className={s.actionHeader}>
        <Button
          text='Create an Event'
          span
          onClick={openCreateModal}
        />
      </section>
      <section>
        <table className={s.dataTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date & Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{textAlign: 'center'}}>Loading...</td>
              </tr>
            ) : eventsData.length === 0 ? (
              <tr>
                <td colSpan={5} style={{textAlign: 'center'}}>No events found</td>
              </tr>
            ) : (
              eventsData.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                  <td>{`${formatDate(event.date)} ${formatTime(event.time_start)}${event.time_end ? ` - ${formatTime(event.time_end)}`: ''}`}</td>
                  <td>
                    <div className='flex gap-10 j-end'>
                      <button
                        className={s.editBtn}
                        title='Edit'
                        onClick={() => openEditModal(event)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                      </button>
                      <button
                        className={s.deleteBtn}
                        title='Delete'
                        onClick={() => handleDelete(event.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      {modalState && <EventModal />}
    </div>
  )
}

export default AdminEvent