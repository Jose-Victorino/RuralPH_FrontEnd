import { NavLink } from 'react-router'

import { scrollReset } from '@/library/Util'
import Button from '@/components/Button/Button'

import s from './Footer.module.scss'

import logoPng from '/logo.png'

function Footer() {
  
  return (
    <footer className={s.footer}>
      <div className='container'>
        <div className={s.top}>
            <div className={s.content}>
              <img src={logoPng} className={s.logo} alt="logo" />
              <p>Harnessing the full potential of the countryside to ensure food security, achieve environmental sustainability, and drive economic opportunity.</p>
              <Button
                text='Become a Member'
                span
                role='link'
                color='yellow'
                to='https://ruriclub.com/pages/membership'
              />
          </div>
        </div>
        <div className={s.bottom}>
          <ul className='flex gap-20'>
            <li>
              <NavLink to='/privacy-policy' onClick={() => scrollReset()}>Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to='/terms-and-conditions' onClick={() => scrollReset()}>Terms and Conditions</NavLink>
            </li>
          </ul>
          <p>© Rural Rising PH, All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer