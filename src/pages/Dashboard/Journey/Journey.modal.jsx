import { useState } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { journeyHooks, supabase } from '@/service/crudService'
import { TABLE_NAME } from './Journey'

import Loader from '@/components/Loader/Loader'
import CircularLoader from '@/components/Loader/CircularLoader'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'

import s from './Journey.module.scss'

const BUCKET = 'story-media'

const emptyFormValues = {
  title: '',
  description: '',
  image_path: '',
}

/** @typedef {typeof emptyFormValues} FormValues */
const inputNames = Object.keys(emptyFormValues)

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

const uploadImage = async (file, sourceId) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file)

  if(uploadError){
    console.error('Upload failed:', uploadError.message)
    return { error: uploadError.message }
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName)

  const { error: insertError } = await supabase
    .from('media')
    .insert({
      bucket: BUCKET,
      path: fileName,
      url: data.publicUrl,
      source: 'journey',
      source_id: sourceId ? String(sourceId) : null,
    })

  if(insertError){
    // upload itself succeeded — this just means it won't show up in the media index
    console.error('Error logging media row:', insertError.message)
  }

  return { url: data.publicUrl }
}

const JourneyModal = ({ mainModal, onClose, selectedRecord }) => {
  const [isUploading, setIsUploading] = useState(false)
  const putData = journeyHooks.put()
  const updateData = journeyHooks.update()

  const isUpdate = mainModal === 'UPDATE'
  const initialValues = isUpdate && selectedRecord
    ? generateValues(selectedRecord)
    : emptyFormValues

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldError, setFieldTouched } = useFormik({
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

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if(!file) return

    setIsUploading(true)
    setFieldError('image_path', undefined)

    const result = await uploadImage(file, selectedRecord?.id)

    setIsUploading(false)

    if(result.error){
      setFieldTouched('image_path', true, false)
      setFieldError('image_path', 'Upload failed, try again')
      return
    }

    setFieldValue('image_path', result.url)
  }

  return (
    <Modal onClose={onClose} width='600px' height='700px'>
      <form className='flex-col gap-10' id='journey-form' onSubmit={handleSubmit}>
        <Input
          type='text' name='title' value={values.title} onChange={handleChange} onBlur={handleBlur}
          displayName='Title' error={errors.title} touched={touched.title}
        />
        <Input
          type='textarea' name='description' value={values.description} onChange={handleChange} onBlur={handleBlur} required
          displayName='Description' error={errors.description} touched={touched.description}
        />

        <div className='flex-col gap-5'>
          <label htmlFor='image_upload'>Image</label>
          <input
            id='image_upload'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
          />
          {touched.image_path && errors.image_path && <span className='error'>{errors.image_path}</span>}
        </div>

        {isUploading ? <Loader /> : values.image_path ? (
          <img className={s.img} src={values.image_path} alt='preview' />
        ) : null}

        <input type='hidden' name='image_path' value={values.image_path} />
      </form>
      <Modal.Footer>
        <Button
          type='submit'
          form='journey-form'
          text='Submit'
          icon={isSubmitting && <CircularLoader />}
          color='blue'
          span
          disabled={isSubmitting || isUploading}
        />
      </Modal.Footer>
    </Modal>
  )
}

export default JourneyModal