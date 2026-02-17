import { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import cn from 'classnames'

import s from './Navigation.module.scss'

import logoPng from '/logo.png'

const facebookIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
const xIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/></svg>
const tiktokIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z"/></svg>
const instagramIcon = <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"/><path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"/></svg>
const youtubeIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z"/></svg>
const arrowDown = <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144"/></svg>
const burgerSVG = <svg xmlns="http://www.w3.org/2000/svg" fill='white' viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
const xMarkSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>

const Socmed = () =>(
  <ul className={s.socmed}>
    <li>
      <a href="https://www.facebook.com/ruralrisingph/" target='_blank'>{facebookIcon}</a>
    </li>
    <li>
      <a href="https://twitter.com/ruralrisingph" target='_blank'>{xIcon}</a>
    </li>
    <li>
      <a href="https://www.tiktok.com/@ruralrisingph" target='_blank'>{tiktokIcon}</a>
    </li>
    <li>
      <a href="https://www.instagram.com/ruralrisingph/" target='_blank'>{instagramIcon}</a>
    </li>
    <li>
      <a href="https://www.youtube.com/@ruralrisingphilippines1993" target='_blank'>{youtubeIcon}</a>
    </li>
  </ul>
)

function Navigation() {
  const { pathname } = useLocation();
  const [menuVisible, setMenuVisible] = useState(false)
  const [subnavOpen, setSubnavOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const mobileNavRef = useRef(null)

  const closeMenu = () => setMenuVisible(false)

  const openMenu = () => setMenuVisible(true)

  const closeSubnav = () => setSubnavOpen(false)

  const openSubnav = () => setSubnavOpen(true)

  const isHome = pathname === '/'

  useEffect(() => {
    if(!isHome){
      setAtTop(false)
      return
    }
    
    const handleScroll = () => setAtTop(window.scrollY === 0)

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHome])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(!menuVisible) return
      if(mobileNavRef.current && !mobileNavRef.current.contains(event.target)){
        closeMenu()
      }
    }

    if(menuVisible) document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuVisible])

  return (
    <>
      <header className={cn(s.navigation, {[s.atTop]: isHome && atTop, [s.isRouted]: !isHome},)}>
        <div className={s.logoWrap}>
          <div className="container flex-col">
            <Link to='/'>
              <img src={logoPng} className={s.logo} alt="logo" />
            </Link>
          </div>
        </div>
        <section className={s.top}>
          <div className='container flex j-end'>
            <div className='flex gap-20'>
              <a href="tel:+639175017787">+63 9175017787</a>
              <a href="mailto:hello@ruralrisingph.com">hello@ruralrisingph.com</a>
            </div>
          </div>
        </section>
        <section className={s.bottom}>
          <div className='container flex j-space-between a-center'>
            <div>
              <button className={s.burger} onClick={(e) => {
                e.stopPropagation()
                openMenu()
              }}>
                {burgerSVG}
              </button>
            </div>
            <nav className='flex'>
              <ul className={s.navLinks}>
                <li>
                  <NavLink to='/'>Home</NavLink>
                </li>
                <li className={s.hasSubnav} onMouseEnter={openSubnav} onMouseLeave={closeSubnav}>
                  <div className={s.navItem}>
                    <p>About</p>
                    {arrowDown}
                  </div>
                  <ul className={cn(s.subNav, { [s.open]: subnavOpen })}>
                    <li>
                      <NavLink to='/about-us' onClick={closeSubnav}>About us</NavLink>
                    </li>
                    <li>
                      <NavLink to='/our-journey' onClick={closeSubnav}>Our Journey</NavLink>
                    </li>
                    <li>
                      <NavLink to='/faqs' onClick={closeSubnav}>FAQs</NavLink>
                    </li>
                    <li>
                      <NavLink to='/in-the-news' onClick={closeSubnav}>In The News</NavLink>
                    </li>
                    <li>
                      <NavLink to='/events' onClick={closeSubnav}>Events</NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <NavLink to='https://ruriclub.com/'>Shop</NavLink>
                </li>
                <li>
                  <NavLink to='/contact-us'>Contact us</NavLink>
                </li>
              </ul>
            </nav>
            <Socmed className={s.socmed} />
          </div>
        </section>
      </header>
      <div className={cn(s.mobileNav, { [s.open]: menuVisible })} role="dialog" inert={!menuVisible} ref={mobileNavRef}>
        <div className={cn(s.closeCont)}>
          <button onClick={(e) => {
            e.stopPropagation()
            closeMenu()
          }}>
            {xMarkSVG}
          </button>
        </div>
        <nav>
          <ul className={s.mobileNavLinks}>
            <li>
              <NavLink onClick={() => closeMenu()} to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink onClick={() => closeMenu()} to='/about-us'>About us</NavLink>
            </li>
            <li>
              <NavLink onClick={() => closeMenu()} to='/our-journey'>Our Journey</NavLink>
            </li>
            <li>
              <NavLink onClick={() => closeMenu()} to='/faqs'>FAQs</NavLink>
            </li>
            <li>
              <NavLink onClick={() => closeMenu()} to='/in-the-news'>In The News</NavLink>
            </li>
            <li>
              <NavLink onClick={() => closeMenu()} to='/events'>Events</NavLink>
            </li>
            <li>
              <NavLink onClick={() => closeMenu()} to='https://ruriclub.com/'>Shop</NavLink>
            </li>
            <li>
              <NavLink onClick={() => closeMenu()} to='/contact-us'>Contact us</NavLink>
            </li>
          </ul>
        </nav>
        <div className='pad-20'>
          <Socmed />
        </div>
      </div>
    </>
  )
}

export default Navigation