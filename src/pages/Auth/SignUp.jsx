import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserAuth } from '@/context/AuthContext'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'

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
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false) 
  const { SignUpNewUser } = UserAuth()

  const onSubmit = async (values) => {
    const { email, password, rememberMe } = values
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
  
  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={s.form}>
          <h4 className='mb-15'>Sign up</h4>
          <div className='flex-col gap-15'>
            <div className='flex gap-15'>
              <Field className={s.txtField} type='text' name='firstName' placeholder='First Name' required/>
              <Field className={s.txtField} type='text' name='lastName' placeholder='Last Name' required/>
            </div>
            <Field className={s.txtField} type='text' name='email' placeholder='Email' required/>
            <div style={{position: 'relative'}}>
              <Field className={s.txtField} type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' required/>
              <button type='button' className={s.showPass} onClick={() => setShowPassword((prev) => !prev)}>
                <img src={showPassword ? eyeIcon : eyeSlashIcon} loading="lazy" alt="eye" />
              </button>
            </div>
          </div>
          <Button
            type='submit'
            text='Sign up'
            color='green'
          />
        </Form>
      </Formik>
      <div className={s.alt}>
        <p>Already have an account? <NavLink to='/auth/login' replace={true}>Login</NavLink></p>
      </div>
    </>
  )
}

export default SignUp