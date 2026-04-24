import Modal from '@/components/Modal/Modal'
import { formatDateTime, formatDate, formatTime } from '@/library/Util'

import s from './InformationModal.module.scss'

function formatValue(path, val) {
  if(!val) return val
  if(Array.isArray(val)){
    return val.length
  }
  if(path === 'created_at'){
    return formatDateTime(val)
  }
  if(path.includes('date')){
    return formatDate(val)
  }
  if(path.includes('time')){
    return formatTime(val)
  }

  return val
}

const getNestedValue = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj)

function InformationModal({ setInfoModal, selectedRecord, dir }) {
  if (!selectedRecord) return null

  return (
    <Modal
      onClose={() => setInfoModal(false)}
      width='480px'
      height='620px'
    >
      <ul className={s.infoGrid}>
        {Object.entries(dir).map(([label, path]) => {
          const val = getNestedValue(selectedRecord, path)
          const formattedValues = formatValue(path, val)

          return (
            <li key={path}>
              <b>{label}: </b>
              <p>{formattedValues}</p>
            </li>
          )
        })}
      </ul>
    </Modal>
  )
}

export default InformationModal