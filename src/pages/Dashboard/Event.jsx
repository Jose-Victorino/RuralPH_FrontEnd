import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { formatDate, formatTime, wordCap } from '@/library/Util'
import { createCRUD } from '@/service/crudService'

import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'
import Breadcrumbs from './Breadcrumbs'
import InformationModal from './InformationModal'

import s from './Event.module.scss'

const infoSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
const editSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
const deleteSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>

const today = new Date()
today.setHours(0, 0, 0, 0)

const schema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  location: Yup.string().required('Location is required'),
  date: Yup.date().min(today, 'Date must be today or onwards').required('Date is required'),
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
const service = createCRUD(TABLE_NAME)

const EventModal = ({ mainModal, setMainModal, selectedRecord, handleModalSubmit }) => {
  const initialValues = mainModal === 'UPDATE' && selectedRecord ? {
    title: selectedRecord.title ?? '',
    description: selectedRecord.description ?? '',
    location: selectedRecord.location ?? '',
    date: selectedRecord.date ?? '',
    time_start: selectedRecord.time_start ?? '',
    time_end: selectedRecord.time_end ?? '',
  } : emptyFormValues

  return (
    <Modal
      onClose={() => setMainModal(false)}
      width='480px'
      height='620px'
    >
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        enableReinitialize
        onSubmit={handleModalSubmit}
      >
        {({ errors, touched, isSubmitting }) => {
          return (
            <Form className={s.form}>
              <div>
                <Input displayName='Title' error={errors.title} touched={touched.title} input={{ type: 'text', name:'title', id:'title', required: true }}/>
                <Input displayName='Description' error={errors.description} touched={touched.description} input={{ type: 'text', name:'description', id:'description', required: false }}/>
                <Input displayName='Location' error={errors.location} touched={touched.location} input={{ type: 'text', name:'location', id:'location', required: true }}/>
                <Input displayName='Date' error={errors.date} touched={touched.date} input={{ type: 'date', name:'date', id:'date', required: true }}/>
                <Input displayName='Time Start' error={errors.time_start} touched={touched.time_start} input={{ type: 'time', name:'time_start', id:'time_start', required: true }}/>
                <Input displayName='Time End' error={errors.time_end} touched={touched.time_end} input={{ type: 'time', name:'time_end', id:'time_end', required: false }}/>
              </div>
              <Button type='submit' text='Submit' disabled={isSubmitting} />
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

function Event() {
  const [infoModal, setInfoModal] = useState(false)
  const [mainModal, setMainModal] = useState(false)
  const [data, setData] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  
  document.title = `${wordCap(TABLE_NAME)} | Admin | Rural Rising PH`
  
  const fetchData = async () => await service.getAll(setLoading, setData)
  
  useEffect(() => {
    fetchData()
    service.subscribeToChanges(fetchData)
  }, [])

  const handleModalSubmit = async (values, { setSubmitting }) => {
    const payload = {
      title: values.title || null,
      description: values.description || null,
      location: values.location || null,
      date: values.date || null,
      time_start: values.time_start || null,
      time_end: values.time_end || null,
    }

    const isInsert = mainModal === 'INSERT'
    const { error } = isInsert ?
      await service.putData(payload) :
      await service.updateData(payload, selectedRecord.id)
    
    setSubmitting(false)
    if(error){
      toast.error('An error occurred')
      console.error(`Error ${isInsert ? 'adding' : 'updating'} on ${TABLE_NAME}: `, error.message)
      return
    }
    toast.success(`${TABLE_NAME} has been ${isInsert ? 'added' : 'updated'}`)
    closeModal()
  }

  const handleDelete = async (id) => await service.deleteData(id)

  const openCreateModal = () => {
    setSelectedRecord(null)
    setMainModal('INSERT')
  }
  const openEditModal = (record) => {
    setSelectedRecord(record)
    setMainModal('UPDATE')
  }
  const openInfoModal = (record) => {
    setSelectedRecord(record)
    setInfoModal(true)
  }
  const closeModal = () => {
    setMainModal(null)
    setSelectedRecord(null)
  }

  return (
    <div className={s.container}>
      <Breadcrumbs crumbs={[
        {
          text: 'Home',
          path: '/dashboard/',
        },
        {
          text: 'Event',
          path: `/dashboard/${TABLE_NAME}`,
        }
      ]}/>
      <section className={s.actionHeader}>
        <Button
          text={`Add ${wordCap(TABLE_NAME)}`}
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
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} style={{textAlign: 'center'}}>No events found</td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id}>
                  <td>{row.title}</td>
                  <td>{row.description}</td>
                  <td>{row.location}</td>
                  <td>{`${formatDate(row.date)} ${formatTime(row.time_start)}${row.time_end ? ` - ${formatTime(row.time_end)}`: ''}`}</td>
                  <td>
                    <div>
                      <button
                        className={s.infoBtn}
                        title='Info'
                        onClick={() => openInfoModal(row)}
                      >
                        {infoSVG}
                      </button>
                      <button
                        className={s.editBtn}
                        title='Edit'
                        onClick={() => openEditModal(row)}
                      >
                        {editSVG}
                      </button>
                      <button
                        className={s.deleteBtn}
                        title='Delete'
                        onClick={() => handleDelete(row.id)}
                      >
                        {deleteSVG}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      {mainModal && <EventModal {...{mainModal, setMainModal, selectedRecord, handleModalSubmit}}/>}
      {infoModal && <InformationModal {...{setInfoModal, selectedRecord}}/>}
    </div>
  )
}

export default Event