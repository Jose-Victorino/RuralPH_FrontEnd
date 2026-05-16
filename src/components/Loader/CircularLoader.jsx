import s from './CircularLoader.module.scss'

function CircularLoader({ height = '1.25em' }){

  return (
    <div
      className={s.loader}
      style={{ height: height ?? '1.25em' }}
    />
  )
}

export default CircularLoader