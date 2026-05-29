import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import { formatDate, formatTime, wordCap } from '@/library/Util'
import { eventHooks } from '@/service/crudService'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Loader from '@/components/Loader/Loader'
import Button from '@/components/Button/Button'
import Breadcrumbs from '../Breadcrumbs'
import InformationModal from '../InformationModal'
import ActionDropdown from '../ActionDropdown'
import Pagination from '../pagination'
import EventModal from './Event.modal'

import s from './Event.module.scss'

const addSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>

export const TABLE_NAME = 'event'
const PER_PAGE = 10

const DataRow = ({ row, openInfoModal, openEditModal, handleDelete }) => {
  const [dropdown, setDropdown] = useState(false)
  const buttonRef = useRef(null)

  return (
    <tr>
      <td>{row.title}</td>
      <td>{row.description}</td>
      <td>{row.location}</td>
      <td className='text-right'>{`${formatDate(row.date)} ${formatTime(row.time_start)}${row.time_end ? ` - ${formatTime(row.time_end)}`: ''}`}</td>
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

function Event() {
  const deleteData = eventHooks.delete()

  const [infoModal, setInfoModal] = useState(false)
  const [mainModal, setMainModal] = useState('')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [page, setPage] = useState(1)
  
  useDocumentTitle(`${wordCap(TABLE_NAME)} | Dashboard | Rural Rising PH`)

  eventHooks.subscribe()

  const { data: { data: eventData = [], count } = {}, isLoading, isError, refetch } = eventHooks.getAll({
    page,
    pageSize: PER_PAGE,
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

      // @ts-ignore
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
          label: 'Event',
          path: `/dashboard/${TABLE_NAME}`,
        }
      ]}/>
      {(isError && !isLoading)
        ? <p className='text-center'>An error has occured. <button className={s.tryAgainBtn} onClick={() => refetch()}>Try again</button></p>
        : <>
          <section>
            <Button
              color='blue'
              text={`Add ${wordCap(TABLE_NAME)}`}
              icon={addSVG}
              onClick={openCreateModal}
            />
          </section>
          <section className='flex-col gap-20'>
            {isLoading ? <Loader /> :
              <div className={s.tableCont}>
                <table className={s.dataTable}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Location</th>
                      <th style={{textAlign: 'end'}}>Date & Time</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventData?.length
                      ? eventData.map((row) => <DataRow key={row.id} row={row} openInfoModal={openInfoModal} openEditModal={openEditModal} handleDelete={handleDelete}/>)
                      : <tr>
                        <td colSpan={5} className='text-center'>{`No ${TABLE_NAME} found`}</td>
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
      {mainModal && <EventModal {...{mainModal, onClose: () => closeModal(), selectedRecord}}/>}
      {infoModal && <InformationModal {...{setInfoModal, selectedRecord, dir: {
        'Title': 'title',
        'Description': 'description',
        'Location': 'location',
        'Date': 'date',
        'Time Start': 'time_start',
        'Time End': 'time_end',
        'Created At': 'created_at',
      }}}/>}
    </div>
  )
}

export default Event