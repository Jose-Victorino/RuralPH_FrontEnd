import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { profilesHooks } from '@/service/crudService'

import CircularLoader from '@/components/Loader/CircularLoader'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input'

const emptyFormValues = {
  first_name: '',
  last_name: '',
  roleid: '',
}

/** @typedef {typeof emptyFormValues} FormValues */
const inputNames = Object.keys(emptyFormValues)

/**
 * @param {Record<string, any>} record
 * @returns {FormValues}
 */
const generateValues = (record) => {
  return inputNames.reduce((prev, cur) => ({
    ...prev,
    [cur]: record?.[cur] ?? ''
  }), /** @type {FormValues} */ ({}))
}

const generatePayload = (values) => ({
  first_name: values.first_name || null,
  last_name: values.last_name || null,
  roleid: values.roleid === '' ? null : Number(values.roleid),
})

const validationSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  roleid: Yup.number().oneOf([2, 3], 'Invalid role').required('Role is required'),
})

const UsersModal = ({ onClose, selectedRecord }) => {
  const updateData = profilesHooks.update()

  const initialValues = selectedRecord
    ? generateValues(selectedRecord)
    : emptyFormValues

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      const payload = generatePayload(values)

      // @ts-ignore
      updateData.mutate({ payload, id: selectedRecord.id })

      setSubmitting(false)
      if(updateData.isError){
        toast.error('An error occurred')
        console.error('Error updating profiles: ', updateData.error?.message)
        return
      }
      toast.success('User has been updated')
      onClose()
    }
  })

  return (
    <Modal onClose={onClose} width='600px' height='400px'>
      <form className='flex-col gap-10' id='users-form' onSubmit={handleSubmit}>
        <Input
          type='text' name='first_name' value={values.first_name} onChange={handleChange} onBlur={handleBlur} required
          displayName='First Name' error={errors.first_name} touched={touched.first_name}
        />
        <Input
          type='text' name='last_name' value={values.last_name} onChange={handleChange} onBlur={handleBlur} required
          displayName='Last Name' error={errors.last_name} touched={touched.last_name}
        />
        <Input
          type='number' name='roleid' value={values.roleid} onChange={handleChange} onBlur={handleBlur} required
          displayName='Role ID' error={errors.roleid} touched={touched.roleid}
        />
      </form>
      <Modal.Footer>
        <Button
          type='submit'
          form='users-form'
          text='Submit'
          icon={isSubmitting && <CircularLoader />}
          color='blue'
          span
          disabled={isSubmitting}
        />
      </Modal.Footer>
    </Modal>
  )
}

export default UsersModal