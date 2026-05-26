import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { eventHooks } from '@/service/crudService'
import { TABLE_NAME } from './Event'

import CircularLoader from '@/components/Loader/CircularLoader'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'

import s from './Event.module.scss'

const emptyFormValues = {
  title: '',
  description: '',
  location: '',
  date: '',
  time_start: '',
  time_end: '',
}

/** @typedef {typeof emptyFormValues} FormValues */
const inputNames = Object.keys(emptyFormValues)

/**
 * @param {Record<string, any>} record
 * @returns {FormValues}
 */
const generateValues = (record) => {
  return inputNames.reduce((prev, cur) => ({
    ...prev,
    [cur]: record?.[cur] ?? ''
  }), /** @type {FormValues} */ ({}))
}

const generatePayload = (record) => {
  return inputNames.reduce((prev, cur) => ({
    ...prev,
    [cur]: record?.[cur] || null
  }), {})
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  location: Yup.string().required('Location is required'),
  date: Yup.date().required('Date is required'),
  //.min(today, 'Date must be today or onwards')
  time_start: Yup.string().required('Start time is required'),
  time_end: Yup.string(),
})

const EventModal = ({ mainModal, onClose, selectedRecord }) => {
  const putData = eventHooks.put()
  const updateData = eventHooks.update()

  const isUpdate = mainModal === 'UPDATE'
  const initialValues = isUpdate && selectedRecord
    ? generateValues(selectedRecord)
    : emptyFormValues

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      const payload = generatePayload(values)

      let isError = false
      let errorMessage = ''
  
      if(isUpdate){
        // @ts-ignore
        updateData.mutate({ payload, id: selectedRecord.id })
        isError = updateData.isError
        errorMessage = updateData.error?.message
      }
      else{
        // @ts-ignore
        putData.mutate(payload)
        isError = putData.isError
        errorMessage = putData.error?.message
      }
      
      setSubmitting(false)
      if(isError){
        toast.error('An error occurred')
        console.error(`Error ${isUpdate ? 'updating' : 'adding'} on ${TABLE_NAME}: `, errorMessage)
        return
      }
      toast.success(`${TABLE_NAME} has been ${isUpdate ? 'updated' : 'added'}`)
      onClose()
    }
  })

  return (
    <Modal onClose={onClose} width='600px' height='680px'>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className='flex-col gap-10'>
          <Input
            type='text' name='title' value={values.title} onChange={handleChange} onBlur={handleBlur} required
            displayName='Title' error={errors.title} touched={touched.title}
          />
          <Input
            type='textarea' name='description' value={values.description} onChange={handleChange} onBlur={handleBlur}
            displayName='Description' error={errors.description} touched={touched.description}
          />
          <Input
            type='text' name='location' value={values.location} onChange={handleChange} onBlur={handleBlur} required
            displayName='Location' error={errors.location} touched={touched.location}
          />
          <Input
            type='date' name='date' value={values.date} onChange={handleChange} onBlur={handleBlur} required
            displayName='Date' error={errors.date} touched={touched.date}
          />
          <Input
            type='time' name='time_start' value={values.time_start} onChange={handleChange} onBlur={handleBlur} required
            displayName='Time  Start'error={errors.time_start} touched={touched.time_start}
          />
          <Input
            type='time' name='time_end' value={values.time_end} onChange={handleChange} onBlur={handleBlur}
            displayName='Time End' error={errors.time_end} touched={touched.time_end}
          />
        </div>
        <Button color='blue' type='submit' icon={isSubmitting && <CircularLoader />} text='Submit' disabled={isSubmitting} />
      </form>
    </Modal>
  )
}

export default EventModal