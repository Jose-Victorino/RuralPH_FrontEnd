import cn from 'classnames'
import { Link } from 'react-router'

import s from './Button.module.scss'

const Button = ({
  btnType = 'primary',  // 'primary', 'secondary', 'tertiary'
  size = 'md',       // 'sm', 'md', 'lg'
  text = '',
  type = null,          // 'button', 'submit', 'reset'
  icon = null,
  iconPos = 'left',     // 'left', 'right'
  color = 'green',       // 'blue', 'red', 'yellow', 'green', 'light', 'dark'
  corners = 'curved',   // 'curved', 'sharp', 'rounded'
  title = null,
  disabled = false,
  span = false,
  role = 'button',
  to = '',
  classNames = {},
  style={},
  onClick = () => {},
}) => {
  if(!['primary', 'secondary', 'tertiary'].includes(btnType.toLowerCase()))
    throw new Error("btnType must only be: 'primary', 'secondary', 'tertiary'")
  if(!['sm', 'md', 'lg'].includes(size.toLowerCase()))
    throw new Error("btnType must only be: 'sm', 'md', 'lg'")
  if(!['left', 'right'].includes(iconPos.toLowerCase()))
    throw new Error("iconPos must only be: 'left', 'right'")
  if(!['curved', 'sharp', 'rounded'].includes(corners.toLowerCase()))
    throw new Error("corners must only be: 'curved', 'sharp', 'rounded'")

  const isLink = role === 'link'
  const Component = isLink ? Link : 'button'
  
  return (
    <Component
      className={cn(
        s[`btn-${btnType.toLowerCase()}`],
        s[`sz-${size.toLowerCase()}`],
        s[`color-${color.toLowerCase()}`],
        'j-center',
        'a-center',
        {
          ...classNames,
          ['flex-row']: icon && iconPos.toLowerCase() === 'left',
          ['flex-row-reverse']: icon && iconPos.toLowerCase() === 'right',
        },
      )}
      style={{
        ...style,
        width: span ? '100%' : 'fit-content',
        borderRadius: corners.toLowerCase() === 'curved' ? '5px' : corners.toLowerCase() === 'rounded' && '1.25em',
      }}
      title={title}
      type={['button', 'submit', 'reset'].includes(type) ? type : 'button'}
      disabled={disabled}
      onClick={() => onClick()}
      aria-label={title || text}
      aria-disabled={disabled}
      role={role}
      to={isLink ? to : ''}
    >
      {icon}
      {text}
    </Component>
  )
}

export default Button