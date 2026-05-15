import cn from 'classnames'

import { wordCap } from '@/library/Util'

import s from './Input.module.scss'

function Input({ input: { type = '', name = '', id = '', onChange = null, onBlur = null, required = false, ...rest } = {}, displayName, error, touched }) {

  return (
    <div className={cn('flex-col', s.inputCont)}>
      <label htmlFor={id} style={{ lineHeight: '1.5' }}>{wordCap(displayName || id.replace('_', ' '))} {required && <span className={s.inputRequired}>*</span>}</label>
      {type === 'textarea'
        ? <textarea name={name} id={id} required={required} onChange={onChange} onBlur={onBlur} {...rest}/>
        : <input type={type} name={name} id={id} required={required} onChange={onChange} onBlur={onBlur} {...rest}/>
      }
      {error && touched && <span className={s.errorMsg}>{error}</span>}
    </div>
  )
}

export default Input