import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { journeyHooks } from '@/service/crudService'
import { TABLE_NAME } from './Journey'

import CircularLoader from '@/components/Loader/CircularLoader'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'

import s from './Journey.module.scss'

const emptyFormValues = {
  title: '',
  description: '',
  category_id: '',
  image_path: '',
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
  title: Yup.string(),
  description: Yup.string().required('description is required'),
  image_path: Yup.string().required('image is required'),
})

const JourneyModal = ({ mainModal, onClose, selectedRecord, categoryData }) => {
  const putData = journeyHooks.put()
  const updateData = journeyHooks.update()

  const initialValues = mainModal === 'UPDATE' && selectedRecord
    ? generateValues(selectedRecord)
    : {
      ...emptyFormValues,
      category_id: categoryData?.[0]?.id ?? ''
    }

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      const payload = generatePayload(values)
  
      const isInsert = mainModal === 'INSERT'
      let isError = false
      let errorMessage = ''
  
      if(isInsert){
        // @ts-ignore
        putData.mutate(payload)
        isError = putData.isError
        errorMessage = putData.error?.message
      }
      else{
        // @ts-ignore
        updateData.mutate({ payload, id: selectedRecord.id })
        isError = updateData.isError
        errorMessage = updateData.error?.message
      }
      
      setSubmitting(false)
      if(isError){
        toast.error('An error occurred')
        console.error(`Error ${isInsert ? 'adding' : 'updating'} on ${TABLE_NAME}: `, errorMessage)
        return
      }
      toast.success(`${TABLE_NAME} has been ${isInsert ? 'added' : 'updated'}`)
      onClose()
    }
  })

  return (
    <Modal onClose={onClose} width='480px' height='620px'>
      <form className={s.form} onSubmit={handleSubmit}>
        <div>
          <Input
            type='text' name='title' value={values.title} onChange={handleChange} onBlur={handleBlur}
            displayName='Title' error={errors.title} touched={touched.title}
          />
          <Input
            type='textarea' name='description' value={values.description} onChange={handleChange} onBlur={handleBlur} required
            displayName='Description' error={errors.description} touched={touched.description}
          />
          <div className={s.selectCont}>
            <label htmlFor='category'>Category<span className={s.inputRequired}>*</span></label>
            <select name='category_id' id='category' className={s.select} value={values.category_id} onChange={handleChange} onBlur={handleBlur} required>
              {categoryData.length &&
                categoryData.map(c =>
                  <option key={c.id} value={c.id}>{c.name}</option>
                )
              }
            </select>
          </div>
          <Input
            type='text' name='image_path' value={values.image_path} onChange={handleChange} onBlur={handleBlur} required
            displayName='Image Link' error={errors.image_path} touched={touched.image_path}
          />
        </div>
        <Button type='submit' icon={isSubmitting && <CircularLoader />} text='Submit' disabled={isSubmitting} span />
      </form>
    </Modal>
  )
}

export default JourneyModal