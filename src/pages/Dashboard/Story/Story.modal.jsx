import { useState } from 'react'
import { useFormik } from 'formik'
import { UserAuth } from '@/context/AuthContext'
import { toast } from 'react-toastify'

import { storyHooks, storyMediaHooks } from '@/service/crudService'
import { TABLE_NAME } from './Story'

import CircularLoader from '@/components/Loader/CircularLoader'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'
import RichTextEditor from './Editor'
import MediaModal from './Media.modal'
import DraftModal from './Draft.modal'

import s from './Story.module.scss'

const addSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
const xMarkSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>

const StoryModal = ({ mainModal, onClose, selectedRecord, categoryData }) => {
  const { session } = UserAuth()
  const [submitMode, setSubmitMode] = useState('published')
  const [mediaModal, setMediaModal] = useState(false)
  const [draftModal, setDraftModal] = useState(false)
  const [activeDraftId, setActiveDraftId] = useState(null)
  const [editorKey, setEditorKey] = useState(0)
  const putData = storyHooks.put(false)
  const updateData = storyHooks.update()
  const putMediaData = storyMediaHooks.put()
  const deleteMediaData = storyMediaHooks.delete()

  const author_id = session.user.id
  
  const { data: { data: draftData = [] } = {} } = storyHooks.getAll({
    filters: {
      author_id,
      status: 'draft',
    },
  })

  const isUpdate = mainModal === 'UPDATE' || Boolean(activeDraftId)
  const isPublishSubmit = submitMode === 'published'

  const initialValues = isUpdate && selectedRecord ? {
    title: selectedRecord?.title ?? '',
    category_id: selectedRecord.category_id ?? '',
    description: {
      html: selectedRecord?.description ?? '',
      hashtags: selectedRecord?.hashtags?.split(',') ?? [],
    },
    media: selectedRecord?.story_media?.map(m => m.media_path) ?? [],
  } : {
    title: '',
    category_id: '',
    description: { html: '', hashtags: [] },
    media: [],
  }
  const { values, setFieldValue, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {  
      const today = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })    
      const storyPayload = {
        author_id,
        title: values?.title || null,
        category_id: values?.category_id || null,
        description: values?.description?.html || null,
        hashtags: values?.description?.hashtags?.join(',') || null,
        status: submitMode,
        updated_at: today,
        ...(mainModal === 'INSERT' ? {published_at: isPublishSubmit ? today : null} : {}),
      }
      const mediaPaths = values.media
      let isError = null

      const targetId = selectedRecord?.id || activeDraftId
    
      try{
        if(isUpdate){
          // @ts-ignore
          const { error: storyError } = await updateData.mutateAsync({ payload: storyPayload, id: targetId })
          if(!storyError){
            // @ts-ignore
            const { error: deleteError } = await deleteMediaData.mutateAsync({ column: 'story_id', value: targetId })
  
            if(!deleteError && mediaPaths.length > 0){
              const mediaPayload = mediaPaths.map(media_path => ({
                story_id: targetId,
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
        } else{
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
        }
      } catch(error){
        isError = error
      }
      
      setSubmitting(false)
      if(isError){
        toast.error('An error occurred')
        console.error(`Error ${isUpdate ? 'updating' : 'adding'} on ${TABLE_NAME}: `, isError.message)
        return
      }

      const successMsg = isPublishSubmit
        ? Boolean(activeDraftId)
          ? `${TABLE_NAME} has been added`
          : `${TABLE_NAME} has been ${isUpdate ? 'updated' : 'added'}`
        : `${TABLE_NAME} is saved as draft`
      toast.success(successMsg)
      onClose()
    }
  })

  const addMedia = (newMedia) => {
    setFieldValue('media', [...values.media, newMedia])
  }

  const handleDraftSelect = (selectedDraft) => {
    setActiveDraftId(selectedDraft.id)

    setFieldValue('title', selectedDraft?.title ?? '')
    setFieldValue('category_id', selectedDraft?.category_id ?? '')
    setFieldValue('description', {
      html: selectedDraft?.description ?? '',
      hashtags: selectedDraft?.hashtags?.split(',') ?? []
    })
    setFieldValue('media', selectedDraft?.story_media?.map(({media_path}) => media_path) ?? [])

    setEditorKey(k => k + 1)
  }

  return (
    <Modal onClose={onClose} width='1000px' height='100%'>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className='flex-col gap-10'>
          <Input
            type='text' name='title' value={values.title} onChange={handleChange} onBlur={handleBlur}
            displayName='Title' error={errors.title} touched={touched.title}
          />
          <div className={s.selectCont}>
            <p>Category</p>
            <select name='category_id' id='category' className={s.select} value={values.category_id} onChange={handleChange} onBlur={handleBlur}>
              <option value=''></option>
              {categoryData.length &&
                categoryData.map(c =>
                  <option key={c.id} value={c.id}>{c.name}</option>
                )
              }
            </select>
          </div>
          <div>
            <p>Description</p>
            <RichTextEditor value={values.description} onChange={(value) => setFieldValue('description', value)} editorKey={editorKey}/>
          </div>
          <div className='flex-col gap-10'>
            <h5>Media</h5>
            {touched.media && errors.media && typeof errors.media === 'string' && <span className={s.errorMsg}>{errors.media}</span>}
            <ul className={s.mediaList}>
              {values.media.length ?
                values.media.map((m, i) =>
                  <li key={i} className='pos-r'>
                    <button
                      type='button'
                      className={s.deleteMediaBtn}
                      title='Delete image'
                      onClick={() => setFieldValue('media', values.media.filter((_, idx) => idx !== i))}
                    >
                      {xMarkSVG}
                    </button>
                    <img src={m} loading='lazy' alt='media image' />
                  </li>
                ) : null
              }
              <li>
                <button
                  type='button'
                  role='button'
                  className={s.AddMedia}
                  onClick={() => setMediaModal(true)}
                  disabled={values.media.length >= 10}
                >
                  {addSVG}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex gap-10 j-space-between'>
          <div className='flex gap-10'>
            <Button
              type='submit'
              text={isUpdate ? 'Submit' : 'Post'}
              icon={isPublishSubmit && isSubmitting && <CircularLoader />}
              color='blue'
              onClick={() => setSubmitMode('published')}
              disabled={isSubmitting}
            />
            {!isUpdate &&
              <Button
                btnType='secondary'
                type='submit'
                text='Save as draft'
                icon={!isPublishSubmit && isSubmitting && <CircularLoader />}
                color='blue'
                onClick={() => setSubmitMode('draft')}
                disabled={isSubmitting}
              />
            }
          </div>
          {!isUpdate && draftData.length ?
            <Button
              btnType='tertiary'
              text='Drafts'
              onClick={() => setDraftModal(true)}
              disabled={isSubmitting}
            /> : null
          }
        </div>
      </form>
      {mediaModal && <MediaModal onClose={() => setMediaModal(false)} onSubmit={addMedia}/>}
      {draftModal && <DraftModal onClose={() => setDraftModal(false)} onSubmit={handleDraftSelect} drafts={draftData}/>}
    </Modal>
  )
}

export default StoryModal