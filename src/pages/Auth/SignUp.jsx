import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserAuth } from '@/context/AuthContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import Button from '@/components/Button/Button'

import s from './SignUp.module.scss'

import eyeIcon from 'svg/eye.svg'
import eyeSlashIcon from 'svg/eye-slash.svg'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: Yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters minimum')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter'),
    // .matches(/[0-9]/, 'Password requires a number')
    // .matches(/[^a-zA-Z0-9]/, 'Password requires a symbol')
  phoneNumber: Yup.string().required('Phone number is required').matches(/^[0-9]{11,}$/, 'Phone number must be at least 11 digits'),
  birthday: Yup.string().required(),
})

function SignUp() {
  useDocumentTitle('Signup | Rural Rising PH')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false) 
  const { SignUpNewUser } = UserAuth()

  const onSubmit = async (values) => {
    const { email, password } = values
    setLoading(true)
    
    try {
      const res = await SignUpNewUser(email, password)
      if(res.success) navigate('/dashboard')
    } catch (error) {
      setError('an error occured: ', error)
    } finally {
      setLoading(false)
    }
  }

  const { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit
  })
  
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <h4 className='mb-15'>Sign up</h4>
        <div className='flex-col gap-15'>
          <div className='flex gap-15'>
            <input className={s.txtField} type='text' name='firstName' placeholder='First Name' value={values.firstName} onChange={handleChange} onBlur={handleBlur} required/>
            <input className={s.txtField} type='text' name='lastName' placeholder='Last Name' value={values.lastName} onChange={handleChange} onBlur={handleBlur} required/>
          </div>
          <input className={s.txtField} type='email' name='email' placeholder='Email' value={values.email} onChange={handleChange} onBlur={handleBlur} required/>
          <div className='pos-r'>
            <input className={s.txtField} type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' value={values.password} onChange={handleChange} onBlur={handleBlur} required/>
            <button type='button' className={s.showPass} onClick={() => setShowPassword((prev) => !prev)}>
              <img src={showPassword ? eyeIcon : eyeSlashIcon} loading="lazy" alt="eye" />
            </button>
          </div>
          {errors.password && <span className={s.errorMsg}>{errors.password}</span>}
          {error && <span className={s.errorMsg}>{error}</span>}
        </div>
        <Button
          type='submit'
          text={(isSubmitting && loading) ? 'Loading...' : 'Sign up'}
          color='green'
          disabled={isSubmitting}
        />
      </form>
      <div className={s.alt}>
        <p>Already have an account? <NavLink to='/auth/login' replace={true}>Login</NavLink></p>
      </div>
    </>
  )
}

export default SignUp