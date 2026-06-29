import { useState } from 'react'
import { toast } from 'react-toastify'

import { supabase } from '@/service/crudService'

import Loader from '@/components/Loader/Loader'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'

const BUCKET = 'story-media'

const uploadImage = async ({ file, source, sourceId }) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file)

  if(uploadError){
    console.error('Upload failed:', uploadError.message)
    return { error: uploadError.message }
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName)

  const { error: insertError } = await supabase
    .from('media')
    .insert({
      bucket: BUCKET,
      path: fileName,
      url: data.publicUrl,
      source,
      source_id: sourceId ? String(sourceId) : null,
    })

  if(insertError){
    // upload itself succeeded — this just means it won't show up in the media index
    console.error('Error logging media row:', insertError.message)
  }

  return { url: data.publicUrl }
}

const MediaModal = ({ onClose, onSubmit, source = 'story', sourceId = null }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if(!file) return

    setIsUploading(true)
    setError('')

    const result = await uploadImage({ file, source, sourceId })

    setIsUploading(false)

    if(result.error){
      setError('Upload failed, try again')
      toast.error('Upload failed')
      return
    }

    onSubmit(result.url)
    onClose()
  }

  return (
    <Modal onClose={onClose} width='420px' height='200px'>
      <div className='flex-col gap-5 mb-20'>
        <p>Upload Media</p>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          disabled={isUploading}
        />
        {isUploading && <Loader />}
        {error && <span className='error'>{error}</span>}
      </div>
      <Modal.Footer>
        <Button
          btnType='secondary'
          type='button'
          text='Cancel'
          color='blue'
          onClick={onClose}
          disabled={isUploading}
        />
      </Modal.Footer>
    </Modal>
  )
}

export default MediaModal