import Modal from '@/components/Modal/Modal'
import { formatDate, formatTime } from '@/library/Util'

import s from './InformationModal.module.scss'

function formatValue(key, val) {
  if (!val) return val

  if (key === 'created_at') {
    return `${formatDate(val)} ${formatTime(val)}`
  }

  if (key.includes('date')) {
    return formatDate(val)
  }

  if (key.includes('time')) {
    return formatTime(val)
  }

  return val
}

function InformationModal({ setInfoModal, selectedRecord }) {
  if (!selectedRecord) return null

  return (
    <Modal
      onClose={() => setInfoModal(false)}
      width='480px'
      height='620px'
    >
      <ul className={s.infoGrid}>
        {Object.entries(selectedRecord).map(([key, val]) => {
          if (key === 'id') return null

          const normalizedKey = key.replaceAll('_', ' ')
          const formattedValues = formatValue(key, val)

          return (
            <li key={key}>
              <b>{normalizedKey}: </b>
              <p>{formattedValues}</p>
            </li>
          )
        })}
      </ul>
    </Modal>
  )
}

export default InformationModal

