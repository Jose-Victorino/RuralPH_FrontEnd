import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import cn from 'classnames'

import { VISIBILITY_MAP } from './Story'
import { storyHooks } from '@/service/crudService'
import { wordCap } from '@/library/Util'

import Modal from '@/components/Modal/Modal'
import DeleteIcon from '@mui/icons-material/Delete'

import s from './Story.module.scss'

const DraftModal = ({onClose, onSubmit, drafts}) => {
  const deleteData = storyHooks.delete()

  const handleSubmit = (row) => {
    onSubmit(row)
    onClose()
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: `Do you want to delete this draft?`,
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

        toast.success(`draft has been deleted`)
      } catch (error){
        toast.error('An error occurred')
        console.error('Error deleting: ', error.message)
      }
    })
  }

  return (
    <Modal
      onClose={onClose}
      height='90%'
      width='900px'
    >
      <div className={s.tableCont}>
        <table className={s.draftTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th style={{textAlign: 'center'}}>Media</th>
              <th style={{textAlign: 'center'}}>Visibility</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {drafts.map((row) =>
              <tr key={row.id} onClick={() => handleSubmit(row)}>
                <td>{row.title}</td>
                <td>{row.category?.name}</td>
                <td>
                  <div className='ql-override ql-snow'>
                    <div
                      className={cn('ql-editor', s.descriptionPreview)}
                      dangerouslySetInnerHTML={{__html: row.description}}
                    />
                  </div>
                </td>
                <td className='text-center'>{row?.story_media?.length}</td>
                <td className='text-center' title={wordCap(row.visibility)}>{VISIBILITY_MAP[row.visibility]}</td>
                <td>
                  <button className='flex' onClick={(e) => {e.stopPropagation(); handleDelete(row.id)}}>
                    <DeleteIcon fontSize="medium" />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}

export default DraftModal