import cn from 'classnames'

import { wordCap } from '@/library/Util'

import s from './Input.module.scss'

function Input({ children, input, displayName, error, touched }) {
  const { type, id, required = false, ...rest } = input

  return (
    <div className={cn('flex-col', s.inputCont)}>
      <label htmlFor={id} style={{ lineHeight: '1.5' }}>{wordCap(displayName || id.replace('_', ' '))} {required && <span className={s.inputRequired}>*</span>}</label>
      {type === 'textarea'
        ? <textarea type={type} id={id} required={required} {...rest}/>
        : <input type={type} id={id} required={required} {...rest}/>
      }
      {error && touched && <span className={s.errorMsg}>{error}</span>}
    </div>
  )
}

export default Input