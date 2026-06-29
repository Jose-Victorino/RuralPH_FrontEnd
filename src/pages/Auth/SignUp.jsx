import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { UserAuth } from '@/context/AuthContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { toast } from 'react-toastify'

import { wordCap } from '@/library/Util'
import Button from '@/components/Button/Button'

import s from './SignUp.module.scss'

import eyeIcon from 'svg/eye.svg'
import eyeSlashIcon from 'svg/eye-slash.svg'

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[A-Za-z]+$/, 'First name must only contain alphabets')
    .required('First name is required'),
  last_name: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Last name must only contain alphabets')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters minimum')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter'),
    // .matches(/[0-9]/, 'Password requires a number')
    // .matches(/[^a-zA-Z0-9]/, 'Password requires a symbol')
  confirm_password: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
})

function SignUp() {
  useDocumentTitle('Signup | Rural Rising PH')
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { signUpNewUser } = UserAuth()

  const { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema,
    onSubmit: async (value, { setSubmitting }) => {
      const { first_name, last_name, email, password } = value
      const capitalizedFirstName = wordCap(first_name)
      const capitalizedLasttName = wordCap(last_name)

      setSubmitting(true)
      try{
        const res = await signUpNewUser(capitalizedFirstName, capitalizedLasttName, email, password)

        if(res.success){
          toast.success('A confirmation email has been sent.')
          navigate('/auth/login', { replace: true })
        }
        if(res.error) setError(res.error.message)
      } catch(error){
        console.error(error)
        setError('an error occured')
      } finally{
        setSubmitting(false)
      }
    }
  })

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <h4 className='mb-15'>Sign up</h4>
        <div className='flex-col gap-15'>
          <div className='flex gap-10'>
            <input className={s.txtField} type='text' name='first_name' placeholder='First Name' value={values.first_name} onChange={handleChange} onBlur={handleBlur} required/>
            <input className={s.txtField} type='text' name='last_name' placeholder='Last Name' value={values.last_name} onChange={handleChange} onBlur={handleBlur} required/>
          </div>
          {errors.first_name && <span className={s.errorMsg}>{errors.first_name}</span>}
          {errors.last_name && <span className={s.errorMsg}>{errors.last_name}</span>}
          <input className={s.txtField} type='email' name='email' placeholder='Email' value={values.email} onChange={handleChange} onBlur={handleBlur} required/>
          <div className='pos-r'>
            <input className={s.txtField} type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' value={values.password} onChange={handleChange} onBlur={handleBlur} required/>
            <button type='button' className={s.showPass} onClick={() => setShowPassword((prev) => !prev)}>
              <img src={showPassword ? eyeIcon : eyeSlashIcon} loading="lazy" alt="eye" />
            </button>
          </div>
          {errors.password && <span className={s.errorMsg}>{errors.password}</span>}
          <div className='pos-r'>
            <input className={s.txtField} type={showConfirmPassword ? 'text' : 'password'} name='confirm_password' placeholder='Confirm Password' value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} required/>
            <button type='button' className={s.showPass} onClick={() => setShowConfirmPassword((prev) => !prev)}>
              <img src={showConfirmPassword ? eyeIcon : eyeSlashIcon} loading="lazy" alt="eye" />
            </button>
          </div>
          {errors.confirm_password && <span className={s.errorMsg}>{errors.confirm_password}</span>}
          {error && <span className={s.errorMsg}>{error}</span>}
        </div>
        <Button
          type='submit'
          text={isSubmitting ? 'Loading...' : 'Sign up'}
          color='green'
          span
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