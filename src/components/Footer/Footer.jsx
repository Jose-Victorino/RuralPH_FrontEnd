import { NavLink, useNavigate } from 'react-router-dom'

import Button from '@/components/Button/Button'

import s from './Footer.module.scss'

import logoPng from '/logo.png'

function Footer() {
  const navigate = useNavigate()
  
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
                onClick={() => navigate('https://ruriclub.com/membership/')}
              />
          </div>
        </div>
        <div className={s.bottom}>
          <ul className='flex gap-20'>
            <li>
              <NavLink to='/privacy-policy' onClick={() => window.scrollTo(0, 0)}>Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to='/terms-and-conditions' onClick={() => window.scrollTo(0, 0)}>Terms and Conditions</NavLink>
            </li>
          </ul>
          <span>© Rural Rising PH, All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer