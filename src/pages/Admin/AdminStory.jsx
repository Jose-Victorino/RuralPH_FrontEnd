import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { formatDate, formatTime } from '@/library/Util'
import { createCRUD } from '@/service/crudService'
import { toast } from 'react-toastify'

import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'
import Breadcrumbs from './Breadcrumbs'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'

import s from './AdminStory.module.scss'

const checkSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
const editSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
const deleteSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>



const TABLE_NAME = 'story'
const storyService = createCRUD(TABLE_NAME)

function AdminStory() {
  const [modalState, setModalState] = useState(false)
  const [data, setData] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  
  document.title = `Event | Admin | Rural Rising PH`

  return (
    <div className={s.container}>
      <Breadcrumbs crumbs={[
        {
          text: 'Home',
          path: '/admin',
        },
        {
          text: 'Story',
          path: '/admin/Story',
        }
      ]}/>
      <section className={s.actionHeader}>
        <Button
          text='Add a Story'
          span
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
                <td colSpan={5} style={{textAlign: 'center'}}>Loading...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} style={{textAlign: 'center'}}>No news found</td>
              </tr>
            ) : (
              data.map((story) => (
                <tr key={story.id}>
                  <td>{story.title}</td>
                  <td>{story.description}</td>
                  <td></td>
                  <td>
                    <div className='flex gap-10 j-center'>
                      <button
                        className={s.editBtn}
                        title='edit'
                        onClick={() => openEditModal(story)}
                      >
                        {editSVG}
                      </button>
                      <button
                        className={s.deleteBtn}
                        title='delete'
                        onClick={() => handleDelete(story.id)}
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
    </div>
  )
}

export default AdminStory