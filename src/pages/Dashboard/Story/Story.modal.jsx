import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { storyHooks, storyMediaHooks } from '@/service/crudService'
import { TABLE_NAME } from './Story'

import CircularLoader from '@/components/Loader/CircularLoader'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'

import s from './Story.module.scss'

const addSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>

const emptyFormValues = {
  title: '',
  description: '',
  media: [],
}

const generateValues = (record) => ({
  title: record?.title ?? '',
  description: record?.description ?? '',
  media: record?.story_media?.map(m => m.media_path) ?? [],
})

const generatePayload = (record) => ({
  title: record?.title || null,
  description: record?.description || null,
})

const validationSchema = Yup.object({
  title: Yup.string(),
  description: Yup.string().required('description is required'),
  media: Yup.array().min(1, 'upload atleast 1 media'),
})

const StoryModal = ({ mainModal, onClose, selectedRecord }) => {
  const putData = storyHooks.put()
  const updateData = storyHooks.update()
  const putMediaData = storyMediaHooks.put()
  const deleteMediaData = storyMediaHooks.delete()

  const initialValues = mainModal === 'UPDATE' && selectedRecord
    ? generateValues(selectedRecord)
    : emptyFormValues

  const { values, setFieldValue, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      const today = new Date().toISOString().split('T')[0]
      const storyPayload = {...generatePayload(values), created_at: today}
      const mediaPaths = values.media.filter((m) => m !== '')
  
      const isInsert = mainModal === 'INSERT'
      let isError = null
    
      try{
        if(isInsert){
          // @ts-ignore
          const { data: story, error: storyError } = await putData.mutateAsync(storyPayload)
          if(!storyError && mediaPaths.length > 0){
            const mediaPayload = mediaPaths.map(media_path => ({
              story_id: story[0].id,
              media_path,
            }))
            // @ts-ignore
            const { error: mediaError } = await putMediaData.mutateAsync(mediaPayload)
            isError = mediaError
          }
          else{
            isError = storyError
          }
        } else{
          // @ts-ignore
          const { error: storyError } = await updateData.mutateAsync({ payload: storyPayload, id: selectedRecord.id })
          if(!storyError){
            // @ts-ignore
            const { error: deleteError } = await deleteMediaData.mutateAsync({ column: 'story_id', value: selectedRecord.id })
  
            if(!deleteError && mediaPaths.length > 0){
              const mediaPayload = mediaPaths.map(media_path => ({
                story_id: selectedRecord.id,
                media_path,
              }))
              // @ts-ignore
              const { error: mediaError } = await putMediaData.mutateAsync(mediaPayload)
              isError = mediaError
            }
            else{
              isError = deleteError
            }
          }
          else{
            isError = storyError
          }
        }
      } catch(error){
        isError = error
      }
      
      setSubmitting(false)
      if(isError){
        toast.error('An error occurred')
        console.error(`Error ${isInsert ? 'adding' : 'updating'} on ${TABLE_NAME}: `, isError.message)
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
          <div className='flex-col gap-10'>
            <div>
              <p>Media</p>
              <Button
                type='button'
                text='Add Media'
                icon={addSVG}
                onClick={() => setFieldValue('media', [...values.media, ''])}
                disabled={values.media.length >= 10}
              />
            </div>
            {touched.media && errors.media && typeof errors.media === 'string' && <span>{errors.media}</span>}
            {values.media.length > 0 &&
              <ul className='flex-col gap-10'>
                {values.media.map((path, i) => (
                  <li key={i} className='flex a-center gap-5'>
                    <input
                      type="text"
                      value={path}
                      className={s.mediaInput}
                      onChange={e => {
                        const updated = [...values.media]
                        updated[i] = e.target.value
                        setFieldValue('media', updated)
                      }}
                    />
                    <button type="button" className={s.removeBtn} onClick={() => setFieldValue('media', values.media.filter((_, idx) => idx !== i))}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            }
          </div>
        </div>
        <Button type='submit' icon={isSubmitting && <CircularLoader />} text='Submit' disabled={isSubmitting} span />
      </form>
    </Modal>
  )
}

export default StoryModal