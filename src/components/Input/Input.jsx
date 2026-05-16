import cn from 'classnames'

import { wordCap } from '@/library/Util'

import s from './Input.module.scss'

function Input(props) {
  const { error, touched, id, displayName, type, required = false, span, ...rest } = props

  const inputId = id ?? props.name

  return (
    <div className={cn('flex-col', s.inputCont)}>
      {displayName &&
        <label htmlFor={inputId} style={{ lineHeight: '1.5' }}>{wordCap(displayName)} {required && <span className={s.inputRequired}>*</span>}</label>
      }
      {type === 'textarea'
        ? <textarea id={inputId} required={required} {...rest}/>
        : <input type={type} id={inputId} required={required} {...rest}/>
      }
      {error && touched && <span className={s.errorMsg}>{error}</span>}
    </div>
  )
}

export default Input