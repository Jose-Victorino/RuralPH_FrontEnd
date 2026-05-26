import { useEffect, useRef } from 'react'

import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'

const MediaModal = ({onClose, onSubmit}) => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = () => {
    const value = inputRef.current.value

    if(!value){
      onClose()
      return
    }

    onSubmit(inputRef.current.value)
    onClose()
  }

  return (
    <Modal onClose={onClose} width='420px' height='200px'>
      <div className='flex-col gap-5 mb-20'>
        <p>Media Link</p>
        <Input ref={inputRef} type='text' required onKeyDown={e => e.key === 'Enter' && e.target.value !== '' && handleSubmit()} />
      </div>
      <Modal.Footer>
        <div className='flex gap-10'>
          <Button
            type='button'
            text='Confirm'
            color='blue'
            onClick={() => handleSubmit()}
          />
          <Button
            btnType='secondary'
            type='button'
            text='Cancel'
            color='blue'
            onClick={onClose}
          />
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default MediaModal