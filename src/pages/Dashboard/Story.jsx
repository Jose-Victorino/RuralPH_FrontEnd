import { useState, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useClickOutside from '@/hooks/useClickOutside'

import { formatDate, wordCap } from '@/library/Util'
import { storyHooks, storyMediaHooks } from '@/service/crudService'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Loader from '@/components/Loader/Loader'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'
import Breadcrumbs from './Breadcrumbs'
import InformationModal from './InformationModal'
import ActionDropdown from './ActionDropdown'

import s from './Story.module.scss'

const addSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
const arrowLeft = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z"/></svg>
const arrowRight = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C266.6 515.2 246.3 515.2 233.8 502.7C221.3 490.2 221.3 469.9 233.8 457.4L371.2 320L233.9 182.6C221.4 170.1 221.4 149.8 233.9 137.3C246.4 124.8 266.7 124.8 279.2 137.3L439.2 297.3z"/></svg>

const schema = Yup.object({
  title: Yup.string(),
  description: Yup.string().required('description is required'),
  media: Yup.array().min(1, 'upload atleast 1 media'),
})
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

const TABLE_NAME = 'story'
const PER_PAGE = 10

const StoryModal = ({ mainModal, setMainModal, selectedRecord, handleModalSubmit }) => {
  const initialValues = mainModal === 'UPDATE' && selectedRecord
  ? generateValues(selectedRecord)
  : emptyFormValues

  const { values, setFieldValue, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: handleModalSubmit
  })

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
            input={{ type: 'text', name:'title', id:'title', value: values.title, onChange: handleChange, onBlur: handleBlur }}
          />
          <Input
            displayName='Description'
            error={errors.description}
            touched={touched.description}
            input={{ type: 'textarea', name:'description', id:'description', value: values.description, onChange: handleChange, onBlur: handleBlur, required: true }}
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
                span
              />
            </div>
            {touched.media && errors.media && <span>{errors.media}</span>}
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
        <Button type='submit' text='Submit' disabled={isSubmitting} />
      </form>
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
      <td className='text-right'>{row.story_media.length}</td>
      <td className='text-right'>{formatDate(row.created_at)}</td>
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

function Story() {
  const putData = storyHooks.put()
  const updateData = storyHooks.update()
  const deleteData = storyHooks.delete()
  const putMediaData = storyMediaHooks.put()
  const deleteMediaData = storyMediaHooks.delete()

  const [infoModal, setInfoModal] = useState(false)
  const [mainModal, setMainModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [page, setPage] = useState(1)
  
  useDocumentTitle(`${wordCap(TABLE_NAME)} | Dashboard | Rural Rising PH`)
  
  storyHooks.subscribe(['story_media'])

  const { data: { data: storyData = [], count } = {}, isLoading, isPending } = storyHooks.getAll({
    page,
    pageSize: PER_PAGE,
  })

  const totalPages = Math.ceil(count / PER_PAGE) || 1

  const handleModalSubmit = async (values, { setSubmitting }) => {
    const storyPayload = {...generatePayload(values), created_at: new Date()}
    const mediaPaths = values.media.filter((m) => m !== '')

    const isInsert = mainModal === 'INSERT'
    let isError = null
    try {
      if(isInsert){
        const { data: story, error: storyError } = await putData.mutateAsync(storyPayload)
        if(!storyError && mediaPaths.length > 0){
          const mediaPayload = mediaPaths.map(media_path => ({
            story_id: story[0].id,
            media_path,
          }))
          const { error: mediaError } = await putMediaData.mutateAsync(mediaPayload)
          isError = mediaError
        }
        else{
          isError = storyError
        }
      } else{
        const { error: storyError } = await updateData.mutateAsync({ payload: storyPayload, id: selectedRecord.id })
        if(!storyError){
          const { error: deleteError } = await deleteMediaData.mutateAsync({ column: 'story_id', value: selectedRecord.id })

          if(!deleteError && mediaPaths.length > 0){
            const mediaPayload = mediaPaths.map(media_path => ({
              story_id: selectedRecord.id,
              media_path,
            }))
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
    } catch (error) {
      isError = error
    }
    
    setSubmitting(false)
    if(isError){
      toast.error('An error occurred')
      console.error(`Error ${isInsert ? 'adding' : 'updating'} on ${TABLE_NAME}: `, isError.message)
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

      try{
        const { error } = await deleteData.mutateAsync({ value: id })
        if(error){
          toast.error('An error occurred')
          console.error('Error deleting: ', error.message)
          return
        }

        toast.success(`${TABLE_NAME} has been deleted`)
      } catch (error){
        toast.error('An error occurred')
        console.error('Error deleting: ', error.message)
      }
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
          label: 'Story',
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
                <th style={{textAlign: 'end'}}>Media</th>
                <th style={{textAlign: 'end'}}>Date Posted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {storyData.length === 0 ? 
                <tr>
                  <td colSpan={5} className='text-center'>{`No ${TABLE_NAME} found`}</td>
                </tr>
              : storyData.map((row) => <DataRow key={row.id} row={row} openInfoModal={openInfoModal} openEditModal={openEditModal} handleDelete={handleDelete}/>)
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
      {mainModal && <StoryModal {...{mainModal, setMainModal, selectedRecord, handleModalSubmit}}/>}
      {infoModal && <InformationModal {...{setInfoModal, selectedRecord, dir: {
        'Title': 'title',
        'Description': 'description',
        'Media': 'story_media',
        'Date Posted': 'created_at',
      }}}/>}
    </div>
  )
}

export default Story