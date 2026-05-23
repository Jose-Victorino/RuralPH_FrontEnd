import { useRef } from 'react'

import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'

const MediaModal = ({onClose, onSubmit}) => {
  const inputRef = useRef(null)

  const handleSubmit = () => {
    onSubmit(inputRef.current.value)
    onClose()
  }

  return (
    <Modal onClose={onClose} width='420px' height='200px'>
      <div className='flex-col gap-5 mb-20'>
        <p>Media Link</p>
        <Input ref={inputRef} type='text' required/>
      </div>
      <div className='flex gap-10'>
        <Button
          type='button'
          text='Confirm'
          color='blue'
          onClick={() => handleSubmit()}
        />
        <Button
          type='button'
          text='Cancel'
          color='blue'
          onClick={onClose}
        />
      </div>
    </Modal>
  )
}

export default MediaModal