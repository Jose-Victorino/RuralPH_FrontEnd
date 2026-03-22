import cn from 'classnames'

import { wordCap } from '@/library/Util'

import s from './Input.module.scss'

function Input({ children, input, displayName, error, touched }) {
  const { type, id, required = false } = input

  return (
    <div className={cn('flex-col', s.inputCont)}>
      <label htmlFor={id} className='mb-5'>{wordCap(displayName || id.replace('_', ' '))} {required && <span className={s.inputRequired}>*</span>}</label>
      {['select', 'textarea'].includes(type)
        ? <input as={type} {...input}>{children}</input>
        : <input {...input}/>
      }
      {error && touched && <span className={s.errorMsg}>{error}</span>}
    </div>
  )
}

export default Input