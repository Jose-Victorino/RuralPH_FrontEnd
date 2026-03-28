import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import cn from 'classnames'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import { wordCap } from '@/library/Util'
import { createCRUD } from '@/service/crudService'
import useDebounce from '@/hooks/useDebounce'

import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'
import Breadcrumbs from './Breadcrumbs'
import InformationModal from './InformationModal'

import s from './News.module.scss'

const checkSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
const infoSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
const editSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
const deleteSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>

const schema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  video_url: Yup.string().required('Video is required').matches(/^(https?:\/\/)?(www\.)?vimeo\.com\/\d+$/, 'Invalid Vimeo URL'),
  video_id: Yup.string(),
  thumbnail_url: Yup.string(),
})

const VIMEO_REGEX = /^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)$/
const emptyFormValues = {
  title: '',
  description: '',
  video_id: '',
  video_url: '',
  thumbnail_url: '',
}
const inputNames = Object.keys(emptyFormValues)

const generateValues = (record) => {
  return inputNames.reduce((prev, cur) => ({
    ...prev,
    [cur]: record?.[cur] ?? ''
  }), {})
}
const generatePayload = (record) => {
  return inputNames.reduce((prev, cur) => ({
    ...prev,
    [cur]: record?.[cur] || null
  }), {})
}

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

const TABLE_NAME = 'news'
const service = createCRUD(TABLE_NAME)

const NewsModal = ({ mainModal, setMainModal, selectedRecord, handleModalSubmit }) => {
  const [isFetchingThumbnail, setIsFetchingThumbnail] = useState(false)
  // const [playerState, setPlayerState] = useState(false)
  
  const initialValues = mainModal === 'UPDATE' && selectedRecord
  ? generateValues(selectedRecord)
  : emptyFormValues

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldError, setFieldTouched } = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: handleModalSubmit
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
  }, [debouncedVideoUrl])
  
  return (
    <Modal
      onClose={() => setMainModal(false)}
      width='480px'
      height='620px'
    >
      <form className={s.form} onSubmit={handleSubmit}>
        <div>
          <Input
            displayName='Title'
            error={errors.title}
            touched={touched.title}
            input={{ type: 'text', name: 'title', id: 'title', value: values.title, onChange: handleChange, onBlur: handleBlur, required: true }}
          />
          <Input
            displayName='Description'
            error={errors.description}
            touched={touched.description}
            input={{ type: 'text', name: 'description', id: 'description', value: values.description, onChange: handleChange, onBlur: handleBlur, required: true }}
          />
          <Input
            displayName='Video Link'
            error={errors.video_url}
            touched={touched.video_url}
            input={{ type: 'text', name: 'video_url', id: 'video_url', placeholder: 'vimeo.com/xxxxxxxxx', value: values.video_url, onChange: handleChange, onBlur: handleBlur, required: true }}
          />
          {isFetchingThumbnail ? (
            <div className={cn(s.thumbnailCont, 'flex j-center a-center')}>
              <p>Loading...</p>
            </div>
          ) : values.thumbnail_url ? (
            // <button className={s.thumbnailCont} onClick={() => setPlayerState(values.video_id)}>
            <button className={s.thumbnailCont}>
              <img className={s.img} src={values.thumbnail_url} alt="thumbnail" />
            </button>
          ) : null}
          <input type="hidden" name="video_id" value={values.video_id} />
          <input type="hidden" name="thumbnail_url" value={values.thumbnail_url} />
        </div>
        <Button type='submit' text='Submit' disabled={isSubmitting} />
      </form>
      {/* {playerState && <VideoPlayer onClose={() => setPlayerState(false)} videoId={playerState}/>} */}
    </Modal>
  )
}

function News() {
  const [infoModal, setInfoModal] = useState(false)
  const [mainModal, setMainModal] = useState(false)
  const [data, setData] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [loading, setLoading] = useState(true)

  useDocumentTitle(`${wordCap(TABLE_NAME)} | Dashboard | Rural Rising PH`)

  const fetchData = async () => await service.getAll(setLoading, setData)
    
  useEffect(() => {
    fetchData()
    service.subscribeToChanges(fetchData)
  }, [])

  const handleModalSubmit = async (values, { setSubmitting }) => {
    const payload = generatePayload(values)

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
    setSelectedRecord(null)
    setMainModal(null)
  }
  
  return (
    <div className={s.container}>
      <Breadcrumbs crumbs={[
        {
          text: 'Home',
          path: '/dashboard/',
        },
        {
          text: 'News',
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
              <th style={{width: '160px'}}>Video Attached</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{textAlign: 'center'}}>Loading...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} style={{textAlign: 'center'}}>{`No ${TABLE_NAME} found`}</td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id}>
                  <td>{row.title}</td>
                  <td>{row.description}</td>
                  <td>{row.video_id && checkSVG}</td>
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
                        title='edit'
                        onClick={() => openEditModal(row)}
                      >
                        {editSVG}
                      </button>
                      <button
                        className={s.deleteBtn}
                        title='delete'
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
      {mainModal && <NewsModal {...{mainModal, setMainModal, selectedRecord, handleModalSubmit}}/>}
      {infoModal && <InformationModal {...{setInfoModal, selectedRecord}}/>}
    </div>
  )
}

export default News