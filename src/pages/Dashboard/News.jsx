import { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useClickOutside from '@/hooks/useClickOutside'

import { wordCap } from '@/library/Util'
import { newsHooks } from '@/service/crudService'
import useDebounce from '@/hooks/useDebounce'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Loader from '@/components/Loader/Loader'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'
import Breadcrumbs from './Breadcrumbs'
import InformationModal from './InformationModal'
import ActionDropdown from './ActionDropdown'

import s from './News.module.scss'

const checkSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
const addSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
const arrowLeft = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z"/></svg>
const arrowRight = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C266.6 515.2 246.3 515.2 233.8 502.7C221.3 490.2 221.3 469.9 233.8 457.4L371.2 320L233.9 182.6C221.4 170.1 221.4 149.8 233.9 137.3C246.4 124.8 266.7 124.8 279.2 137.3L439.2 297.3z"/></svg>

const VIMEO_REGEX = /^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)$/
const schema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  video_url: Yup.string().required('Video is required').matches(VIMEO_REGEX, 'Invalid Vimeo URL'),
  video_id: Yup.string(),
  thumbnail_url: Yup.string(),
})

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
const PER_PAGE = 10

const NewsModal = ({ mainModal, setMainModal, selectedRecord, handleModalSubmit }) => {
  const [isFetchingThumbnail, setIsFetchingThumbnail] = useState(false)
  
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
      height='665px'
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
            input={{ type: 'textarea', name: 'description', id: 'description', value: values.description, onChange: handleChange, onBlur: handleBlur, required: true }}
          />
          <Input
            displayName='Video Link'
            error={errors.video_url}
            touched={touched.video_url}
            input={{ type: 'text', name: 'video_url', id: 'video_url', placeholder: 'vimeo.com/xxxxxxxxx', value: values.video_url, onChange: handleChange, onBlur: handleBlur, required: true }}
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
        <Button type='submit' text='Submit' disabled={isSubmitting} />
      </form>
      {/* {playerState && <VideoPlayer onClose={() => setPlayerState(false)} videoId={playerState}/>} */}
    </Modal>
  )
}

const DataRow = ({ row, openInfoModal, openEditModal, handleDelete }) => {
  const [dropdown, setDropdown] = useState(false)
  const dropdownRef = useRef()

  useClickOutside(dropdownRef, () => setDropdown(false), dropdown)

  return (
    <tr>
      <td>{row.title}</td>
      <td className={s.descriptionData}>{row.description}</td>
      <td className={s.checkmarkData}>{row.video_id && checkSVG}</td>
      <td>
        <div className='pos-r flex j-center a-center'>
          <button
            className='flex'
            title='actions menu'
            onClick={() => setDropdown(true)}
          >
            <MoreHorizIcon />
          </button>
          {dropdown &&
            <ActionDropdown
              ref={dropdownRef}
              onInfo={() => openInfoModal(row)}
              onEdit={() => openEditModal(row)}
              onDelete={() => handleDelete(row.id)}
              onClose={() => setDropdown(false)}
            />
          }
        </div>
      </td>
    </tr>
  )
}

function News() {
  const putData = newsHooks.put()
  const updateData = newsHooks.update()
  const deleteData = newsHooks.delete()

  const [infoModal, setInfoModal] = useState(false)
  const [mainModal, setMainModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [page, setPage] = useState(1)

  useDocumentTitle(`${wordCap(TABLE_NAME)} | Dashboard | Rural Rising PH`)
  
  newsHooks.subscribe()

  const { data: { data: newsData = [], count } = {}, isLoading, isPending } = newsHooks.getAll({
    page,
    pageSize: PER_PAGE,
  })

  const totalPages = Math.ceil(count / PER_PAGE) || 1

  const handleModalSubmit = async (values, { setSubmitting }) => {
    const payload = generatePayload(values)

    const isInsert = mainModal === 'INSERT'
    let isError = false
    let errorMessage = ''
    
    if(isInsert){
      putData.mutate(payload)
      isError = putData.isError
      errorMessage = putData.error?.message
    }
    else{
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
    closeModal()
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: `Do you want to Delete this ${TABLE_NAME}?`,
      showDenyButton: true,
      denyButtonText: `Cancel`,
      confirmButtonText: 'Delete',
    }).then(async (result) => {
      if(!result.isConfirmed) return
  
      deleteData.mutate({ value: id })
      if(deleteData.isError){
        toast.error('An error occurred')
        console.error('Error deleting: ', deleteData.error?.message)
        return
      }
  
      toast.success(`${TABLE_NAME} has been deleted`)
    })
  }

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
          label: 'Home',
          path: '/dashboard/',
        },
        {
          label: 'News',
          path: `/dashboard/${TABLE_NAME}`,
        }
      ]}/>
      <section className={s.actionHeader}>
        <Button
          text={`Add ${wordCap(TABLE_NAME)}`}
          icon={addSVG}
          span
          onClick={openCreateModal}
        />
      </section>
      <section className='flex-col gap-20'>
        {(isLoading || isPending) ? <Loader /> : (
          <table className={s.dataTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th className={s.checkmarkColumn}>Video Attached</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {newsData.length === 0 ?
                <tr>
                  <td colSpan={4} className='text-center'>{`No ${TABLE_NAME} found`}</td>
                </tr>
              : newsData.map((row) => <DataRow key={row.id} row={row} openInfoModal={openInfoModal} openEditModal={openEditModal} handleDelete={handleDelete}/>)
              }
            </tbody>
          </table>
        )}
        <div className={s.pagination}>
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            {arrowLeft}
          </button>
          <span>Page</span>
          <select
            name='page'
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <span>{`of ${totalPages}`}</span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            {arrowRight}
          </button>
        </div>
      </section>
      {mainModal && <NewsModal {...{mainModal, setMainModal, selectedRecord, handleModalSubmit}}/>}
      {infoModal && <InformationModal {...{setInfoModal, selectedRecord, dir: {
        'Title': 'title',
        'Description': 'description',
        'Video Link': 'video_url',
        'Date Posted': 'created_at',
      }}}/>}
    </div>
  )
}

export default News