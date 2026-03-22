import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import Button from '@/components/Button/Button'

import s from './ForgotPassword.module.scss'

import arrowLeft from 'svg/arrow-left.svg'

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
})

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be 8 characters minimum')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password')
})

function ForgotPassword() {
  useDocumentTitle('Forgot Password | Rural Rising PH')
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')

  const verifyEmailExists = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 500)
    })
  }
  const handleBackToEmail = () => {
    setStep(1)
  }
  const handleEmailSubmit = async (values) => {
    setIsVerifying(true)
    setError('')
    
    try {
      const emailExists = await verifyEmailExists(values.email)
      if(emailExists){
        setEmail(values.email)
        setStep(2)
      }
      else setError('Invalid Email')
    }catch{
      setError('Error verifying email. Please try again.')
    }finally{
      setIsVerifying(false)
    }
  }
  const handlePasswordSubmit = (values) => {
    navigate({pathname: '/', replace: true})
    setEmail('')
  }

  const ConfirmEmail = () => {
    const { values, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
      initialValues: {
        email: ''
      },
      validationSchema: emailValidationSchema,
      onSubmit: handleEmailSubmit
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
        <input className={s.txtField} type='email' name='email' placeholder='Enter email' value={values.email} onChange={handleChange} onBlur={handleBlur} required/>
        {error && <span className={s.errorMsg}>{error}</span>}
        <Button
          type='submit'
          text={isVerifying ? 'Verifying...' : 'Confirm'}
          color='green'
          disabled={isVerifying || isSubmitting}
        />
      </form>
    )
}

  const PasswordChange = () => {
    const { values, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
      initialValues: {
        password: '',
        confirmPassword: ''
      },
      validationSchema: passwordValidationSchema,
      onSubmit: handlePasswordSubmit
    })

    return (
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="button" className={s.goBackbtn} onClick={() => navigate(-1)}>
          <div>
            <img src={arrowLeft} loading="lazy" alt="arrow" />
          </div>
          <span>Go Back</span>
        </button>
        <h4 className='mb-15'>Set New Password</h4>
        <p className={s.emailDisplay}>Email: <strong>{email}</strong></p>
        <div className='flex-col gap-15'>
          <input className={s.txtField} type='password' name='password' placeholder='Password' value={values.password} onChange={handleChange} onBlur={handleBlur} required/>
          <input className={s.txtField} type='password' name='confirmPassword' placeholder='Re-enter Password' value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} required/>
        </div>
        <div className='flex gap-10'>
          <Button
            btnType='secondary'
            type='button'
            text='Back'
            color='green'
            onClick={handleBackToEmail}
          />
          <Button
            type='submit'
            text='Reset Password'
            color='green'
            disabled={isSubmitting}
          />
        </div>
      </form>
    )
  }

  return step === 1 ? <ConfirmEmail /> : <PasswordChange />
}

export default ForgotPassword