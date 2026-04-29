import { useState, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useClickOutside from '@/hooks/useClickOutside'

import { wordCap } from '@/library/Util'
import { journeyHooks, journeyCategoryHooks } from '@/service/crudService'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Loader from '@/components/Loader/Loader'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'
import Breadcrumbs from './Breadcrumbs'
import InformationModal from './InformationModal'
import ActionDropdown from './ActionDropdown'

import s from './Journey.module.scss'

const checkSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
const addSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
const editSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
const deleteSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
const arrowLeft = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z"/></svg>
const arrowRight = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C266.6 515.2 246.3 515.2 233.8 502.7C221.3 490.2 221.3 469.9 233.8 457.4L371.2 320L233.9 182.6C221.4 170.1 221.4 149.8 233.9 137.3C246.4 124.8 266.7 124.8 279.2 137.3L439.2 297.3z"/></svg>
const xSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/></svg>

const today = new Date()
today.setHours(0, 0, 0, 0)

const schema = Yup.object({
  title: Yup.string(),
  description: Yup.string().required('description is required'),
  image_path: Yup.string().required('image is required'),
})
const emptyFormValues = {
  title: '',
  description: '',
  image_path: '',
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

const TABLE_NAME = 'journey'
const PER_PAGE = 10

const CategoryModal = ({ setCategoryModal }) => {
  const putData = journeyCategoryHooks.put()
  const updateData = journeyCategoryHooks.update()
  const deleteData = journeyCategoryHooks.delete()

  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [newName, setNewName] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  
  journeyCategoryHooks.subscribe()

  const { data: { data: categoryData = [] } = {}, isLoading, isPending } = journeyCategoryHooks.getAll()

  const handleAdd = async () => {
    const trimmed = newName.trim()
    if(!trimmed) return toast.error('Category name is required')
    setIsAdding(true)
    
    putData.mutate({ name: trimmed })
    
    setIsAdding(false)
    if(putData.isError){
      toast.error('An error occurred')
      console.error('Error adding category:', putData.error?.message)
      return
    }
    toast.success('Category has been added')
    setNewName('')
  }

  const handleEditStart = (record) => {
    setEditingId(record.id)
    setEditingName(record.name)
  }

  const handleEditSave = async (id) => {
    const trimmed = editingName.trim()
    if(!trimmed) return toast.error('Category name is required')

    updateData.mutate({ payload: { name: trimmed }, id })
    if(updateData.isError){
      toast.error('An error occurred')
      console.error('Error updating category:', updateData.error?.message)
      return
    }
    toast.success('Category has been updated')
    setEditingId(null)
    setEditingName('')
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditingName('')
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Do you want to Delete this category?',
      showDenyButton: true,
      denyButtonText: 'Cancel',
      confirmButtonText: 'Delete',
    }).then(async (result) => {
      if(!result.isConfirmed) return

      deleteData.mutate({ value: id })
      if(deleteData.isError){
        toast.error('An error occurred')
        console.error('Error deleting category:', deleteData.error?.message)
        return
      }
      toast.success('Category has been deleted')
    })
  }

  const handleKeyDown = (e, action) => {
    if(e.key === 'Enter') action()
    if(e.key === 'Escape') handleEditCancel()
  }

  return (
    <Modal
      onClose={() => setCategoryModal(false)}
      width='480px'
      height='620px'
    >
      <div className='flex-col gap-15'>
        <div className='flex gap-10'>
          <input
            className='w-100'
            type='text'
            placeholder='New category name...'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, handleAdd)}
          />
          <Button
            text='Add'
            icon={addSVG}
            span
            disabled={isAdding}
            onClick={handleAdd}
          />
        </div>
        {(isLoading || isPending) ? <Loader /> : (
          <ul className={s.categoryList}>
            {categoryData.length === 0 ? <li className='text-center'>No categories found</li>
            : categoryData.map((cat) => (
                <li key={cat.id}>
                  {editingId === cat.id ? (
                    <>
                      <input
                        className={s.categoryInput}
                        type='text'
                        value={editingName}
                        autoFocus
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, () => handleEditSave(cat.id))}
                      />
                      <div className='flex a-center gap-5'>
                        <button
                          className={s.greenBtn}
                          title='Save'
                          onClick={() => handleEditSave(cat.id)}
                        >
                          {checkSVG}
                        </button>
                        <button
                          className={s.redBtn}
                          title='Cancel'
                          onClick={handleEditCancel}
                        >
                          {xSVG}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className={s.categoryName}>
                        {cat.name}
                      </span>
                      <div className='flex a-center gap-5'>
                        <button
                          className={s.blueBtn}
                          title='Edit'
                          onClick={() => handleEditStart(cat)}
                        >
                          {editSVG}
                        </button>
                        <button
                          className={s.redBtn}
                          title='Delete'
                          onClick={() => handleDelete(cat.id)}
                        >
                          {deleteSVG}
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            }
          </ul>
        )}
      </div>
    </Modal>
  )
}

const JourneyModal = ({ mainModal, setMainModal, selectedRecord, handleModalSubmit }) => {
  const initialValues = mainModal === 'UPDATE' && selectedRecord
  ? generateValues(selectedRecord)
  : emptyFormValues

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
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
          <Input
            displayName='Image Link'
            error={errors.image_path}
            touched={touched.image_path}
            input={{ type: 'text', name:'image_path', id:'image_path', value: values.image_path, onChange: handleChange, onBlur: handleBlur, required: true }}
          />
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
      <td>{wordCap(row.journey_category.name.replace('_', ' '))}</td>
      <td className={s.descriptionData}>{row.description}</td>
      <td className={s.checkmarkData}>{row.image_path && checkSVG}</td>
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

function Journey() {
  const putData = journeyHooks.put()
  const updateData = journeyHooks.update()
  const deleteData = journeyHooks.delete()

  const [infoModal, setInfoModal] = useState(false)
  const [mainModal, setMainModal] = useState(false)
  const [categotyModal, setCategoryModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [page, setPage] = useState(1)
  
  useDocumentTitle(`${wordCap(TABLE_NAME)} | Dashboard | Rural Rising PH`)
  
  journeyHooks.subscribe(['journey_category'])

  const { data: { data: journeyData = [], count } = {}, isLoading, isPending } = journeyHooks.getAll({
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
          label: 'Journey',
          path: `/dashboard/${TABLE_NAME}`,
        }
      ]}/>
      <section className='flex gap-10'>
        <Button
          text={`Add ${wordCap(TABLE_NAME)}`}
          icon={addSVG}
          span
          onClick={openCreateModal}
        />
        <Button
          btnType='secondary'
          text='Manage Categories'
          span
          onClick={() => setCategoryModal(true)}
        />
      </section>
      <section className='flex-col gap-20'>
        {(isLoading || isPending) ? <Loader /> : (
          <table className={s.dataTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th className={s.checkmarkColumn}>Image Attached</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {journeyData.length === 0 ?
                <tr>
                  <td colSpan={4} className='text-center'>{`No ${TABLE_NAME} found`}</td>
                </tr>
              : journeyData.map((row) => <DataRow key={row.id} row={row} openInfoModal={openInfoModal} openEditModal={openEditModal} handleDelete={handleDelete}/>)
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
      {mainModal && <JourneyModal {...{mainModal, setMainModal, selectedRecord, handleModalSubmit}}/>}
      {categotyModal && <CategoryModal setCategoryModal={setCategoryModal}/>}
      {infoModal && <InformationModal {...{setInfoModal, selectedRecord, dir: {
        'Title': 'title',
        'Category': 'journey_category.name',
        'Description': 'description',
        'Image': 'image_path',
      }}}/>}
    </div>
  )
}

export default Journey