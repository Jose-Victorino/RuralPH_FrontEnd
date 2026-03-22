import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { UserAuth, useRecoverySession } from '@/context/AuthContext'

import Button from '@/components/Button/Button'

import s from './Recover.module.scss'
import { toast } from 'react-toastify'

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be 8 characters minimum')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password')
})

function Recover() {
  useDocumentTitle('Recover Account | Rural Rising PH')
  const navigate = useNavigate()
  const { updatePassword, signOut } = UserAuth()
  const { recoveryStatus } = useRecoverySession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setError('')
      setLoading(true)
      try {
        const { error } = await updatePassword(values.password)
        if(error){
          setError(error.message || 'Could not update password. Please try again.')
        } else{
          await signOut()
          toast.success('Your password has been reset')
          navigate('/auth/login', { replace: true })
        }
      } catch{
        setError('Something went wrong. Please try again.')
      } finally{
        setLoading(false)
      }
    },
  })

  if(recoveryStatus === 'checking') {
    return (
      <div className={s.form}>
        <h4 className='mb-15'>Set New Password</h4>
        <p className={s.hint}>Verifying your reset link…</p>
      </div>
    )
  }

  if(recoveryStatus === 'invalid') {
    return (
      <div className={s.form}>
        <h4 className='mb-15'>Set New Password</h4>
        <p className={s.hint}>This link is invalid or has expired. Request a new reset from the forgot password page.</p>
        <Button
          text='Forgot password'
          onClick={() => navigate('/auth/forgot-password')}
        />
      </div>
    )
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h4 className='mb-15'>Set New Password</h4>
      <div className='flex-col gap-15'>
        <div className='flex-col gap-5'>
          <input className={s.txtField} type='password' name='password' placeholder='Password' value={values.password} onChange={handleChange} onBlur={handleBlur} required/>
          {errors.password && touched.password && <span className={s.errorMsg}>{errors.password}</span>}
        </div>
        <div className='flex-col gap-5'>
          <input className={s.txtField} type='password' name='confirmPassword' placeholder='Re-enter Password' value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} required/>
          {errors.confirmPassword && touched.confirmPassword && <span className={s.errorMsg}>{errors.confirmPassword}</span>}
        </div>
        {error && <span className={s.errorMsg}>{error}</span>}
      </div>
      <div className='flex gap-10'>
        <Button
          type='submit'
          text={loading ? 'Loading...' : 'Reset Password'}
          color='green'
          disabled={loading || isSubmitting}
        />
      </div>
    </form>
  )
}

export default Recover