import { useState, useContext, createContext, useEffect } from 'react'
import { useFormik } from 'formik'
import { UserAuth } from '@/context/AuthContext'
import { toast } from 'react-toastify'
import { nanoid } from 'nanoid'
import cn from 'classnames'

import { storyHooks, storyMediaHooks, storyService } from '@/service/crudService'
import { TABLE_NAME } from './Story'

import CircularLoader from '@/components/Loader/CircularLoader'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'
import RichTextEditor from './Editor'
import MediaModal from './Media.modal'
import DraftModal from './Draft.modal'

import s from './Story.module.scss'

const FormContext = createContext(null)

const addSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
const xMarkSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>

const copyLink = async (text) => {
  try{
    await navigator.clipboard.writeText(text)
    toast.success('Link copied!')
  } catch(err){
    console.error('Failed to copy: ', err)
  }
}

const ContentTab = () => {
  const { categoryData, editorKey, values, errors, setFieldValue, handleChange } = useContext(FormContext)

  return (
    <>
      <div>
        <Input
          type='text' name='title' value={values.title} onChange={handleChange}
          displayName='Title' error={errors.title}
        />
      </div>
      <div className={s.selectCont}>
        <p>Category</p>
        <select name='category_id' id='category' value={values.category_id} onChange={handleChange}>
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
    </>
  )
}

const MediaTab = () => {
  const [mediaModal, setMediaModal] = useState(false)

  const { values, errors, setFieldValue } = useContext(FormContext)

  const addMedia = (newMedia) => setFieldValue('media', [...values.media, newMedia])

  return (
    <>
      <p>A maximum of 10 images can be attached.</p>
      {errors.media && typeof errors.media === 'string' && <span className={s.errorMsg}>{errors.media}</span>}
      <ul className={s.mediaList}>
        {values.media.length ?
          values.media.map((m, i) =>
            <li key={m} className='pos-r'>
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
        {values.media.length < 10 &&
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
        }
      </ul>
      {mediaModal && <MediaModal onClose={() => setMediaModal(false)} onSubmit={addMedia}/>}
    </>
  )
}

const VisibilityTab = () => {
  const { values, setFieldValue } = useContext(FormContext)

  const appURL = window.location.origin
  const postLink = `${appURL}/story/${values.public_id}`

  return (
    <div className={cn('flex-col gap-10', s.visibility)}>
      <div className={'flex gap-15 pad-15'}>
        <div className='flex-col gap-5'>
          <b>Story Link</b>
          <p className={s.postLink}>{postLink}</p>
        </div>
        <button type='button' className='flex' title='Copy Link' onClick={() => copyLink(postLink)}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 3H14.6C16.8402 3 17.9603 3 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C21 6.03969 21 7.15979 21 9.4V16.5M6.2 21H14.3C15.4201 21 15.9802 21 16.408 20.782C16.7843 20.5903 17.0903 20.2843 17.282 19.908C17.5 19.4802 17.5 18.9201 17.5 17.8V9.7C17.5 8.57989 17.5 8.01984 17.282 7.59202C17.0903 7.21569 16.7843 6.90973 16.408 6.71799C15.9802 6.5 15.4201 6.5 14.3 6.5H6.2C5.0799 6.5 4.51984 6.5 4.09202 6.71799C3.71569 6.90973 3.40973 7.21569 3.21799 7.59202C3 8.01984 3 8.57989 3 9.7V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <ul className={s.visibilityOptions}>
        <li>
          <button type='button' className={cn({[s.selected]: values.visibility === 'public'})} onClick={() => setFieldValue('visibility', 'public')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12H22M2 12C2 17.5228 6.47715 22 12 22M2 12C2 6.47715 6.47715 2 12 2M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div>
              <p className={s.title}>Public</p>
              <p>Everyone can see this post.</p>
            </div>
          </button>
        </li>
        <li>
          <button type='button' className={cn({[s.selected]: values.visibility === 'unlisted'})} onClick={() => setFieldValue('visibility', 'unlisted')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99999 13C10.4294 13.5741 10.9773 14.0491 11.6065 14.3929C12.2357 14.7367 12.9315 14.9411 13.6466 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9547 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.552 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997M14 11C13.5705 10.4258 13.0226 9.95078 12.3934 9.60703C11.7642 9.26327 11.0685 9.05885 10.3533 9.00763C9.63819 8.95641 8.9204 9.0596 8.24864 9.31018C7.57688 9.56077 6.96687 9.9529 6.45999 10.46L3.45999 13.46C2.5492 14.403 2.04522 15.666 2.05662 16.977C2.06801 18.288 2.59385 19.542 3.52089 20.4691C4.44793 21.3961 5.702 21.9219 7.01298 21.9333C8.32396 21.9447 9.58697 21.4408 10.53 20.53L12.24 18.82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div>
              <p className={s.title}>Unlisted</p>
              <p>Anyone with the link can see this post.</p>
            </div>
          </button>
        </li>
        <li>
          <button type='button' className={cn({[s.selected]: values.visibility === 'private'})} onClick={() => setFieldValue('visibility', 'private')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 11V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V11M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H8.8C7.11984 11 6.27976 11 5.63803 11.327C5.07354 11.6146 4.6146 12.0735 4.32698 12.638C4 13.2798 4 14.1198 4 15.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div>
              <p className={s.title}>Private</p>
              <p>Posts can only be seen in the dashboard.</p>
            </div>
          </button>
        </li>
      </ul>
    </div>
  )
}

const StoryModal = ({ mainModal, onClose, selectedRecord, categoryData }) => {
  const { session } = UserAuth()
  const [submitMode, setSubmitMode] = useState('published')
  const [draftModal, setDraftModal] = useState(false)
  const [activeDraftId, setActiveDraftId] = useState(null)
  const [editorKey, setEditorKey] = useState(0)
  const [tab, setTab] = useState(0)

  const putData = storyHooks.put(false)
  const updateData = storyHooks.update()
  const putMediaData = storyMediaHooks.put()
  const deleteMediaData = storyMediaHooks.delete()

  const author_id = session.user.id
  
  const [publicId, setPublicId] = useState(null)

  useEffect(() => {
    const generateUniqueId = async () => {
      let id
      while (true) {
        id = nanoid()
        const { data } = await storyService.getPublicIds(id)
        if(!data) break
      }
      setPublicId(id)
    }

    if(!isUpdate) generateUniqueId()
  }, [])

  const { data: { data: draftData = [] } = {} } = storyHooks.getAll({
    filters: {
      author_id,
      status: 'draft',
    },
  })

  const isModalUpdate = mainModal === 'UPDATE'
  const isUpdate = isModalUpdate || Boolean(activeDraftId)
  const isPublishSubmit = submitMode === 'published'

  const { values, setFieldValue, errors, isSubmitting, handleChange, handleSubmit } = useFormik({
    initialValues: isUpdate && selectedRecord ? {
      title: selectedRecord?.title ?? '',
      category_id: selectedRecord.category_id ?? '',
      description: {
        html: selectedRecord?.description ?? '',
        hashtags: selectedRecord?.hashtags?.split(',') ?? [],
      },
      media: selectedRecord?.story_media?.map(m => m.media_path) ?? [],
      visibility: selectedRecord?.visibility,
      public_id: selectedRecord?.public_id,
    } : {
      title: '',
      category_id: '',
      description: { html: '', hashtags: [] },
      media: [],
      visibility: 'public',
      public_id: publicId ?? nanoid(),
    },
    onSubmit: async (values, { setSubmitting }) => {  
      const today = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })    
      const storyPayload = {
        author_id,
        title: values?.title || null,
        category_id: values?.category_id || null,
        description: values?.description?.html || null,
        hashtags: values?.description?.hashtags?.join(',') || null,
        visibility: values?.visibility || 'public',
        public_id: values?.public_id || null,
        status: submitMode,
        updated_at: today,
        ...(!isModalUpdate ? {published_at: isPublishSubmit ? today : null} : {}),
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
      } finally{
        setSubmitting(false)
      }
      
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

  const handleDraftSelect = (selectedDraft) => {
    setActiveDraftId(selectedDraft.id)

    setFieldValue('title', selectedDraft?.title ?? '')
    setFieldValue('category_id', selectedDraft?.category_id ?? '')
    setFieldValue('description', {
      html: selectedDraft?.description ?? '',
      hashtags: selectedDraft?.hashtags?.split(',') ?? []
    })
    setFieldValue('media', selectedDraft?.story_media?.map(({media_path}) => media_path) ?? [])
    setFieldValue('public_id', selectedDraft?.public_id ?? '')

    setEditorKey(k => k + 1)
    setTab(0)
  }

  return (
    <Modal onClose={onClose} width='1000px' height='100%'>
      <Modal.Header>
        <ul className={s.stepList}>
          <li className={cn({[s.selected]: tab === 0})}>
            <button type='button' onClick={() => setTab(0)}>
              <p>Content</p>
              <div className={s.dot}/>
            </button>
          </li>
          <li className={cn({[s.selected]: tab === 1})}>
            <button type='button' onClick={() => setTab(1)}>
              <p>Media</p>
              <div className={s.dot}/>
            </button>
            <div className={s.divider}/>
          </li>
          <li className={cn({[s.selected]: tab === 2})}>
            <button type='button' onClick={() => setTab(2)}>
              <p>Visibility</p>
              <div className={s.dot}/>
            </button>
            <div className={s.divider}/>
          </li>
        </ul>
      </Modal.Header>
      <FormContext.Provider value={{categoryData, editorKey, values, setFieldValue, errors, handleChange}}>
        <form className={cn(s.form, 'flex-col gap-10')} id='story-form' onSubmit={handleSubmit}>
          {tab === 0 && <ContentTab />}
          {tab === 1 && <MediaTab />}
          {tab === 2 && <VisibilityTab />}
        </form>
      </FormContext.Provider>
      <Modal.Footer>
        <div className='flex gap-10 j-space-between'>
          <div className='flex gap-10'>
            {tab === 2 ?
              <Button
                key='main-submit'
                form='story-form'
                type='submit'
                text={isUpdate ? 'Update' : 'Publish'}
                icon={isPublishSubmit && isSubmitting && <CircularLoader />}
                color='blue'
                onClick={() => setSubmitMode('published')}
                disabled={isSubmitting}
              /> :
              <Button
                key='next'
                type='button'
                text='Next'
                color='blue'
                onClick={() => setTab((p) => ++p)}
              />
            }
            {!isModalUpdate &&
              <Button
                key='save-draft'
                btnType='secondary'
                form='story-form'
                type='submit'
                text='Save as draft'
                icon={!isPublishSubmit && isSubmitting && <CircularLoader />}
                color='blue'
                onClick={() => setSubmitMode('draft')}
                disabled={isSubmitting}
              />
            }
          </div>
          {!isModalUpdate ?
            <Button
              key='load-draft'
              type='button'
              btnType='tertiary'
              form='story-form'
              text='Drafts'
              onClick={() => setDraftModal(true)}
              disabled={isSubmitting}
            /> : null
          }
        </div>
      </Modal.Footer>
      {draftModal && <DraftModal onClose={() => setDraftModal(false)} onSubmit={handleDraftSelect} drafts={draftData}/>}
    </Modal>
  )
}

export default StoryModal