import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import { profilesHooks } from '@/service/crudService'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Loader from '@/components/Loader/Loader'
import Breadcrumbs from '../Breadcrumbs'
import InformationModal from '../InformationModal'
import ActionDropdown from '../ActionDropdown'
import Pagination from '../Pagination'
import UsersModal from './Users.modal'

import s from './Users.module.scss'

export const TABLE_NAME = 'profiles'
const PER_PAGE = 10

const DataRow = ({ row, openInfoModal, openEditModal, handleDelete }) => {
  const [dropdown, setDropdown] = useState(false)
  const buttonRef = useRef(null)

  return (
    <tr>
      <td>{row.first_name}</td>
      <td>{row.last_name}</td>
      <td>{row.roleid}</td>
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

function Users() {
  const deleteData = profilesHooks.delete()

  const [infoModal, setInfoModal] = useState(false)
  const [mainModal, setMainModal] = useState('')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [page, setPage] = useState(1)

  useDocumentTitle('Users | Dashboard | Rural Rising PH')

  profilesHooks.subscribe()

  const { data: { data: usersData = [], count } = {}, isLoading, isError, refetch } = profilesHooks.getAll({
    page,
    pageSize: PER_PAGE,
  })

  const totalPages = Math.ceil(count / PER_PAGE) || 1

  const handleDelete = async (id) => {
    Swal.fire({
      title: `Do you want to delete this user?`,
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

      toast.success('User has been deleted')
    })
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
          label: 'Users',
          path: `/dashboard/${TABLE_NAME}`,
        }
      ]}/>
      {(isError && !isLoading)
        ? <p className='text-center'>An error has occured. <button className={s.tryAgainBtn} onClick={() => refetch()}>Try again</button></p>
        : <section className='flex-col gap-20'>
            {isLoading ? <Loader /> :
              <div className={s.tableCont}>
                <table className={s.dataTable}>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Role ID</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData?.length
                      ? usersData.map((row) => <DataRow key={row.id} row={row} openInfoModal={openInfoModal} openEditModal={openEditModal} handleDelete={handleDelete}/>)
                      : <tr>
                        <td colSpan={4} className='text-center'>No users found</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
            <Pagination {...{ page, setPage, totalPages }}/>
          </section>
      }
      {mainModal && <UsersModal {...{onClose: () => closeModal(), selectedRecord}}/>}
      {infoModal && <InformationModal {...{setInfoModal, selectedRecord, dir: {
        'First Name': 'first_name',
        'Last Name': 'last_name',
        'Role ID': 'roleid',
      }}}/>}
    </div>
  )
}

export default Users