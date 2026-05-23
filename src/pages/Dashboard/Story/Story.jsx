import { useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import { formatDate, wordCap } from '@/library/Util'
import { categoryHooks } from '@/service/crudService'
import { storyHooks } from '@/service/crudService'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Loader from '@/components/Loader/Loader'
import Button from '@/components/Button/Button'
import Breadcrumbs from '../Breadcrumbs'
import InformationModal from '../InformationModal'
import ActionDropdown from '../ActionDropdown'

import StoryModal from './Story.modal'
import CategoryModal from './Category.modal'

import s from './Story.module.scss'

const addSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
const arrowLeft = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z"/></svg>
const arrowRight = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C266.6 515.2 246.3 515.2 233.8 502.7C221.3 490.2 221.3 469.9 233.8 457.4L371.2 320L233.9 182.6C221.4 170.1 221.4 149.8 233.9 137.3C246.4 124.8 266.7 124.8 279.2 137.3L439.2 297.3z"/></svg>

export const TABLE_NAME = 'story'
const PER_PAGE = 10

const DataRow = ({ row, openInfoModal, openEditModal, handleDelete }) => {
  const [dropdown, setDropdown] = useState(false)

  return (
    <tr>
      <td>
        {row.title}
      </td>
      <td>
        {row.category?.name}
      </td>
      <td>
        <div className='ql-override ql-snow'>
          <div
            className={cn('ql-editor', s.descriptionPreview)}
            dangerouslySetInnerHTML={{ __html: row.description }}
          />
        </div>
      </td>
      <td className='text-right'>{row?.story_media?.length || 0}</td>
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
  const deleteData = storyHooks.delete()

  const [infoModal, setInfoModal] = useState(false)
  const [mainModal, setMainModal] = useState('')
  const [categotyModal, setCategoryModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [page, setPage] = useState(1)
  
  useDocumentTitle(`${wordCap(TABLE_NAME)} | Dashboard | Rural Rising PH`)
  
  storyHooks.subscribe(['story_media'])

  const { data: { data: categoryData = [] } = {} } = categoryHooks.getAll()

  const { data: { data: storyData = [], count } = {}, isLoading, isError, refetch } = storyHooks.getAll({
    select: '*, story_media(id, media_path), category(name, slug), profiles(first_name, last_name)',
    page,
    pageSize: PER_PAGE,
    filters: {
      status: 'published',
    },
  })

  const totalPages = Math.ceil(count / PER_PAGE) || 1

  const handleDelete = async (id) => {
    Swal.fire({
      title: `Do you want to delete this ${TABLE_NAME}?`,
      showDenyButton: true,
      denyButtonText: `Cancel`,
      confirmButtonText: 'Delete',
    }).then(async (result) => {
      if(!result.isConfirmed) return

      try{
        // @ts-ignore
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
    setMainModal('')
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
      {(isError && !isLoading)
        ? <p className='text-center'>An error has occured. <button className={s.tryAgainBtn} onClick={() => refetch()}>Try again</button></p>
        : <>
          <section className='flex gap-10'>
            <Button
              color='blue'
              text={`Add ${wordCap(TABLE_NAME)}`}
              icon={addSVG}
              onClick={openCreateModal}
              />
            <Button
              color='blue'
              btnType='secondary'
              text='Manage Categories'
              onClick={() => setCategoryModal(true)}
            />
          </section>
          <section className='flex-col gap-20'>
            {isLoading ? <Loader /> : (
              <table className={s.dataTable}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th style={{textAlign: 'end'}}>Media</th>
                    <th style={{textAlign: 'end'}}>Date Posted</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {storyData.length === 0 ? 
                    <tr>
                      <td colSpan={6} className='text-center'>{`No ${TABLE_NAME} found`}</td>
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
        </>
      }
      {mainModal && <StoryModal {...{mainModal, onClose: () => closeModal(), selectedRecord, categoryData }}/>}
      {categotyModal && <CategoryModal onClose={() => setCategoryModal(false)} categoryData={categoryData}/>}
      {infoModal && <InformationModal {...{setInfoModal, selectedRecord, dir: {
        'Title': 'title',
        'Category': 'category.name',
        'Media': 'story_media',
        'Author': 'profiles',
        'Date Posted': 'published_at',
      }}}/>}
    </div>
  )
}

export default Story