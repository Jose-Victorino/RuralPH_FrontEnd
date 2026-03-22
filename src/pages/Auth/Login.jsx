import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserAuth } from '@/context/AuthContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import Button from '@/components/Button/Button'

import s from './Login.module.scss'

import eyeIcon from 'svg/eye.svg'
import eyeSlashIcon from 'svg/eye-slash.svg'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters minimum')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    // .matches(/[0-9]/, 'Password requires a number')
    // .matches(/[^a-zA-Z0-9]/, 'Password requires a symbol')
})

function Login() {
  useDocumentTitle('Login | Rural Rising PH')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { logInUser } = UserAuth()

  const onSubmit = async (values) => {
    const { email, password } = values
    setLoading(true)
    
    try {
      const res = await logInUser(email, password)
      
      if(res.success) navigate('/dashboard')
      if(res.error) setError(res.error)
    } catch (error) {
      setError('an error occured: ', error)
    } finally {
      setLoading(false)
    }
  }

  const { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit
  })
  
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <h4 className='mb-15'>Login</h4>
        <div className={s.top}>
          <div>
            <input className={s.txtField} type='email' name='email' placeholder='Email' value={values.email} onChange={handleChange} onBlur={handleBlur} required/>
          </div>
          <div className='pos-r'>
            <input className={s.txtField} type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' value={values.password} onChange={handleChange} onBlur={handleBlur} required/>
            <button type='button' className={s.showPass} onClick={() => setShowPassword((prev) => !prev)}>
              <img src={showPassword ? eyeIcon : eyeSlashIcon} loading="lazy" alt="eye" />
            </button>
          </div>
          {errors.password && <span className={s.errorMsg}>{errors.password}</span>}
          {error && <span className={s.errorMsg}>{error}</span>}
        </div>
        <div className={s.bottom}>
          <div>
            <NavLink to='/auth/forgot-password'>Forgot your password?</NavLink>
          </div>
        </div>
        <Button
          type='submit'
          text={(isSubmitting && loading) ? 'Loading...' : 'Login'}
          color='green'
          disabled={isSubmitting}
        />
      </form>
      <div className={s.alt}>
        <p>Don't have an account? <NavLink to='/auth/sign-up' replace={true}>Sign up</NavLink></p>
      </div>
    </>
  )
}

export default Login