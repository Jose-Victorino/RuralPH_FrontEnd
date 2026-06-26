import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { UserAuth } from '@/context/AuthContext'
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
import Pagination from '../Pagination'
import StoryModal from './Story.modal'
import CategoryModal from './Category.modal'

import s from './Story.module.scss'

const addSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>

export const TABLE_NAME = 'story'
const PER_PAGE = 10

export const VISIBILITY_MAP = {
  public: <svg viewBox="0 0 24 24" fill="none" className={s.publicSVG} xmlns="http://www.w3.org/2000/svg"><path d="M2 12H22M2 12C2 17.5228 6.47715 22 12 22M2 12C2 6.47715 6.47715 2 12 2M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  unlisted: <svg viewBox="0 0 24 24" fill="none" className={s.unlistedSVG} xmlns="http://www.w3.org/2000/svg"><path d="M9.99999 13C10.4294 13.5741 10.9773 14.0491 11.6065 14.3929C12.2357 14.7367 12.9315 14.9411 13.6466 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9547 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.552 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997M14 11C13.5705 10.4258 13.0226 9.95078 12.3934 9.60703C11.7642 9.26327 11.0685 9.05885 10.3533 9.00763C9.63819 8.95641 8.9204 9.0596 8.24864 9.31018C7.57688 9.56077 6.96687 9.9529 6.45999 10.46L3.45999 13.46C2.5492 14.403 2.04522 15.666 2.05662 16.977C2.06801 18.288 2.59385 19.542 3.52089 20.4691C4.44793 21.3961 5.702 21.9219 7.01298 21.9333C8.32396 21.9447 9.58697 21.4408 10.53 20.53L12.24 18.82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  private: <svg viewBox="0 0 24 24" fill="none" className={s.privateSVG} xmlns="http://www.w3.org/2000/svg"><path d="M17 11V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V11M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H8.8C7.11984 11 6.27976 11 5.63803 11.327C5.07354 11.6146 4.6146 12.0735 4.32698 12.638C4 13.2798 4 14.1198 4 15.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
}

const DataRow = ({ row, openInfoModal, openEditModal, handleDelete }) => {
  const [dropdown, setDropdown] = useState(false)
  const buttonRef = useRef(null)

  return (
    <tr>
      <td>{row.title}</td>
      <td>{row.category?.name}</td>
      <td>
        <div className='ql-override ql-snow'>
          <div
            className={cn('ql-editor', s.descriptionPreview)}
            dangerouslySetInnerHTML={{ __html: row.description }}
          />
        </div>
      </td>
      <td className='text-center'>{row?.story_media?.length || 0}</td>
      <td className='text-center' title={wordCap(row.visibility)}>{VISIBILITY_MAP[row.visibility]}</td>
      <td className='text-right'>{formatDate(row.published_at)}</td>
      <td>
        <div className='flex j-center a-center'>
          <button
            ref={buttonRef}
            className='flex'
            title='actions menu'
            onClick={() => setDropdown(true)}
          >
            <MoreHorizIcon />
          </button>
          <ActionDropdown
            anchorEl={buttonRef.current}
            open={dropdown}
            onInfo={() => openInfoModal(row)}
            onEdit={() => openEditModal(row)}
            onDelete={() => handleDelete(row.id)}
            onClose={() => setDropdown(false)}
          />
        </div>
      </td>
    </tr>
  )
}

function Story() {
  const { session } = UserAuth()
  const deleteData = storyHooks.delete()

  const [infoModal, setInfoModal] = useState(false)
  const [mainModal, setMainModal] = useState('')
  const [visibility, setVisibility] = useState('')
  const [categotyModal, setCategoryModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [page, setPage] = useState(1)
  
  useDocumentTitle(`${wordCap(TABLE_NAME)} | Dashboard | Rural Rising PH`)
  
  storyHooks.subscribe(['story_media'])

  const { data: { data: storyData = [], count } = {}, isLoading, isError, refetch } = storyHooks.getAll({
    select: '*, story_media(id, media_path), category(name, slug), profiles(first_name, last_name)',
    page,
    pageSize: PER_PAGE,
    filters: {
      status: 'published',
      ...(visibility ? { visibility } : {})
    },
  })

  categoryHooks.prefetchAll({ order: { column: 'name', ascending: true } })

  storyHooks.prefetchAll({
    filters: {
      author_id: session.user.id,
      status: 'draft',
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
          <section className='flex-wrap j-space-between a-center gap-10'>
            <div className='flex gap-10'>
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
            </div>
            <div className={s.selectCont}>
              <select name='category_id' id='category' onChange={(e) => setVisibility(e.target.value)}>
                <option value=''>All</option>
                <option value='public'>Public</option>
                <option value='unlisted'>Unlisted</option>
                <option value='private'>Private</option>
              </select>
            </div>
          </section>
          <section className='flex-col gap-20'>
            {isLoading ? <Loader /> :
              <div className={s.tableCont}>
                <table className={s.dataTable}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th style={{textAlign: 'center'}}>Media</th>
                      <th style={{textAlign: 'center'}}>Visibility</th>
                      <th style={{textAlign: 'end'}}>Date Published</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {storyData?.length
                      ? storyData.map((row) => <DataRow key={row.id} row={row} openInfoModal={openInfoModal} openEditModal={openEditModal} handleDelete={handleDelete}/>)
                      : <tr>
                        <td colSpan={6} className='text-center'>{`No ${TABLE_NAME} found`}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
            <Pagination {...{ page, setPage, totalPages }}/>
          </section>
        </>
      }
      {mainModal && <StoryModal {...{mainModal, onClose: () => closeModal(), selectedRecord }}/>}
      {categotyModal && <CategoryModal onClose={() => setCategoryModal(false)}/>}
      {infoModal && <InformationModal {...{setInfoModal, selectedRecord, dir: {
        'Title': 'title',
        'Author': 'profiles',
        'Category': 'category.name',
        'Media': 'story_media',
        'Visibility': 'visibility',
        'Link': 'public_id',
        'Date Published': 'published_at',
      }}}/>}
    </div>
  )
}

export default Story