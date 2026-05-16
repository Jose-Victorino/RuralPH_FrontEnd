import { useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import { journeyCategoryHooks } from '@/service/crudService'

import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'

import s from './Journey.module.scss'

const checkSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
const addSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
const editSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
const deleteSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
const xSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/></svg>

const CategoryModal = ({ onClose, categoryData }) => {
  const putData = journeyCategoryHooks.put()
  const updateData = journeyCategoryHooks.update()
  const deleteData = journeyCategoryHooks.delete()

  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [newName, setNewName] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  journeyCategoryHooks.subscribe()

  const handleAdd = async () => {
    const trimmed = newName.trim()
    if(!trimmed) return toast.error('Category name is required')
    setIsAdding(true)

    // @ts-ignore
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

    // @ts-ignore
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

      // @ts-ignore
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
    <Modal onClose={onClose} width='480px' height='620px'>
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
            disabled={isAdding}
            onClick={handleAdd}
          />
        </div>
        {!categoryData.length ? <p className='text-center'>No categories found.</p> :
          <ul className={s.categoryList}>
            {categoryData.map((cat) => (
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
            ))}
          </ul>
        }
      </div>
    </Modal>
  )
}

export default CategoryModal