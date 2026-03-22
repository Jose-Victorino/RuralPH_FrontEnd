import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { UserAuth } from '@/context/AuthContext'

import Button from '@/components/Button/Button'

import s from './ForgotPassword.module.scss'

import arrowLeft from 'svg/arrow-left.svg'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
})

function ForgotPassword() {
  useDocumentTitle('Forgot Password | Rural Rising PH')
  const navigate = useNavigate()
  const { requestPasswordReset } = UserAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const { values, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      setError('')
      setSuccessMessage('')

      try {
        const { error } = await requestPasswordReset(values.email)
        if(error) {
          setError(error.message || 'Could not send reset email. Please try again.')
        } else {
          setSuccessMessage('If an account exists for that email, you will receive a link to reset your password shortly.')
        }
      } catch {
        setError('Error sending reset email. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <button type="button" className={s.goBackbtn} onClick={() => navigate(-1)}>
        <div>
          <img src={arrowLeft} loading="lazy" alt="arrow" />
        </div>
        <span>Go Back</span>
      </button>
      <h4 className='mb-15'>Recover Password</h4>
      {successMessage && <span className={s.successMsg}>{successMessage}</span>}
      <input className={s.txtField} type='email' name='email' placeholder='Enter email' value={values.email} onChange={handleChange} onBlur={handleBlur} required disabled={!!successMessage}/>
      {error && <span className={s.errorMsg}>{error}</span>}
      <Button
        type='submit'
        text={isLoading ? 'Loading...' : 'Confirm'}
        color='green'
        disabled={isLoading || isSubmitting}
      />
    </form>
  )
}

export default ForgotPassword