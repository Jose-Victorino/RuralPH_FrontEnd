import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { newsHooks } from '@/service/crudService'
import { TABLE_NAME } from './News'

import useDebounce from '@/hooks/useDebounce'

import Loader from '@/components/Loader/Loader'
import CircularLoader from '@/components/Loader/CircularLoader'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'

import s from './News.module.scss'

const emptyFormValues = {
  title: '',
  description: '',
  video_id: '',
  video_url: '',
  thumbnail_url: '',
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

const VIMEO_REGEX = /^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)$/

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  video_url: Yup.string().required('Video is required').matches(VIMEO_REGEX, 'Invalid Vimeo URL'),
  video_id: Yup.string(),
  thumbnail_url: Yup.string(),
})

const extractVimeoId = (url) => {
  const match = url.trim().match(VIMEO_REGEX)
  return match ? match[3] : null
}

const getThumbnail = async (videoId) => {
  try{
    const res = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`)

    if(!res.ok){
      return { error: 'Video not found' }
    }

    const data = await res.json()

    if(!data.thumbnail_url_with_play_button){
      return { error: 'Invalid video data' }
    }

    return { thumbnail: data.thumbnail_url_with_play_button }
  } catch (err){
    console.error('Thumbnail fetch failed:', err)
    return null
  }
}

const NewsModal = ({ mainModal, onClose, selectedRecord }) => {
  const putData = newsHooks.put()
  const updateData = newsHooks.update()
  const [isFetchingThumbnail, setIsFetchingThumbnail] = useState(false)
  
  const initialValues = mainModal === 'UPDATE' && selectedRecord
    ? generateValues(selectedRecord)
    : emptyFormValues

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldError, setFieldTouched } = useFormik({
    initialValues: initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
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

  const debouncedVideoUrl = useDebounce(values.video_url, 500)

  useEffect(() => {
    let isMounted = true

    const processVideo = async () => {
      const videoId = extractVimeoId(debouncedVideoUrl)
      if(!videoId){
        setFieldValue('video_id', '')
        setFieldValue('thumbnail_url', '')
        return
      }

      setIsFetchingThumbnail(true)
      const result = await getThumbnail(videoId)
      if(!isMounted) return
      setIsFetchingThumbnail(false)

      if(result.error){
        setFieldValue('video_id', '')
        setFieldValue('thumbnail_url', '')
        setFieldError('video_url', result.error)
        setFieldTouched('video_url', true, false)                  
        return
      }
      
      setFieldValue('video_id', videoId)
      setFieldValue('thumbnail_url', result.thumbnail)
    }

    processVideo()
    return () => { isMounted = false }
  }, [debouncedVideoUrl, setFieldValue, setFieldError, setFieldTouched])
  
  return (
    <Modal onClose={onClose} width='480px' height='665px'>
      <form className={s.form} onSubmit={handleSubmit}>
        <div>
          <Input
            type='text' name='title' value={values.title} onChange={handleChange} onBlur={handleBlur} required
            displayName='Title' error={errors.title} touched={touched.title}
          />
          <Input
            type='textarea' name='description' value={values.description} onChange={handleChange} onBlur={handleBlur} required
            displayName='Description' error={errors.description} touched={touched.description}
          />
          <Input
            type='text' name='video_url' placeholder='vimeo.com/xxxxxxxxx' value={values.video_url} onChange={handleChange} onBlur={handleBlur} required
            displayName='Video Link' error={errors.video_url} touched={touched.video_url}
          />
          {isFetchingThumbnail ? <Loader />
          : values.thumbnail_url ? (
            // <button className={s.thumbnailCont} onClick={() => setPlayerState(values.video_id)}>
            <button className={s.thumbnailCont}>
              <img className={s.img} src={values.thumbnail_url} alt="thumbnail" />
            </button>
          ) : null}
          <input type="hidden" name="video_id" value={values.video_id} />
          <input type="hidden" name="thumbnail_url" value={values.thumbnail_url} />
        </div>
        <Button type='submit' icon={isSubmitting && <CircularLoader />} text='Submit' disabled={isSubmitting} span />
      </form>
      {/* {playerState && <VideoPlayer onClose={() => setPlayerState(false)} videoId={playerState}/>} */}
    </Modal>
  )
}

export default NewsModal