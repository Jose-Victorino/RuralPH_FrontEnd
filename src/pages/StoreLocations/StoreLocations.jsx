import { useState } from 'react'
import cn from 'classnames'

import Button from '@/components/Button/Button'

import s from './StoreLocations.module.scss'

import checkIcon from 'svg/check.svg'
import car from 'svg/car.svg'
import transit from 'svg/bus.svg'
import walking from 'svg/person-walking.svg'
import bicycle from 'svg/bicycle.svg'

const STORES = [
  {
    id: 'WEST',
    name: 'RURAL RISING PHILIPPINES - WEST',
    address: 'RURAL RISING PHILIPPINES - West, 79 Sgt. Esguerra, West Triangle, Quezon City, 1104',
    landmark: 'GREEN GATE with Rural Rising Signage.',
    contact: '0917 166 7787 (for courier bookings only)',
  },
  {
    id: 'SOUTH',
    name: 'RURAL RISING PHILIPPINES - SOUTH',
    address: 'RURAL RISING PHILIPINES - SOUTH. Transport Terminal Alabang Town Center, Theater Dr, Ayala Alabang, Muntinlupa',
    landmark: 'Beside Alabang Barangay Health Center. You will see a banner saying "RURI SOUTH"',
    contact: '0968 858 7787 (for courier bookings only)',
  },
  {
    id: 'CENTRAL',
    name: 'RURAL RISING PHILIPPINES - CENTRAL',
    address: 'RURAL RISING PHILIPINES - CENTRAL. Unit #1C-06 G/F Avida Towers Centera Tower 1 Reliance, Cor EDSA, Mandaluyong',
    landmark: 'Beside 24 Chicken. Facing EDSA',
    contact: '0918 908 7786 (for courier bookings only)',
  },
]

const VIEW_TYPES = ['street', 'map']

const MODE_TYPES = [
  {
    name: 'car',
    title: 'Driving',
    svg: car,
  },
  {
    name: 'transit',
    title: 'transit',
    svg: transit,
  },
  {
    name: 'walking',
    title: 'walking',
    svg: walking,
  },
  {
    name: 'bicycle',
    title: 'Bicycling',
    svg: bicycle,
  },
]

function StoreLocations() {
  document.title = "RURI CLUB | Store Locations"

  const [distance, setDistance] = useState(1)
  const [mode, setMode] = useState({})
  const [view, setView] = useState({})

  const handleModeChange = (m, id) => {
    if(mode[id] === m) return;
    setMode((prev) => ({ ...prev, [id]: m }))
  }

  const handleViewChange = (v, id) => {
    if(view[id] === v) return;
    setView((prev) => ({ ...prev, [id]: v }))
  }

  return (
    <section className={s.locationContainer}>
      <div className="container">
        <div className={s.top}>
          <p>See the closest Rural Rising store to you.</p>
          <div className='flex-col flex-wrap j-space-between gap-15'>
            <div className={s.inputCont}>
              <input className={s.input} name='user_location' placeholder='Enter Location' type="text" />
              <div className='flex a-center gap-15'>
                <input className={s.rangePicker} type="range" name='distance' min={1} max={100} defaultValue={distance} onChange={(e) => setDistance(e.target.value)}/>
                <div className={s.distanceVal}>{distance}km</div>
              </div>
            </div>
            <Button
              text='Search'
              color='green'
              span
            />
          </div>
        </div>
        <div className={s.main}>
          <div className={s.left}>
            {STORES.map((store) => {
              return(
                <div key={store.id} className={s.locationItem}>
                  <div>
                    <h5>{store.name}</h5>
                    <p>Address: {store.address}</p>
                    <p>Landmark: {store.landmark}</p>
                    <p>Contact: {store.contact}</p>
                  </div>
                  <div className={cn('flex gap-15', s.view)}>
                    {VIEW_TYPES.map((v) => {
                      const isSelected = view[store.id] === v
                      return (
                        <button
                          key={v}
                          aria-selected={isSelected}
                          onClick={() => handleViewChange(v, store.id)}
                        >
                          {v}
                        </button>
                      )
                    })}
                  </div>
                  <ul className={s.mode}>
                    {MODE_TYPES.map((m) => {
                      const isSelected = mode[store.id] === m.name
                      return (
                        <li key={m.name} className={cn({[s.selected]: isSelected})} aria-selected={isSelected} title={m.title}>
                          <div className={s.checkMark} aria-hidden>
                            <img src={checkIcon} loading="lazy" alt="check" />
                          </div>
                          <button onClick={() => handleModeChange(m.name, store.id)}>
                            <img src={m.svg} loading='lazy' alt={m.name}/>
                          </button>
                        </li>
                      )
                    })
                    }
                  </ul>
                  <div>
                    <input className={s.input} type="text" name={`user_location-${store.id}`} placeholder="Enter Location" autoComplete='off'/>
                  </div>
                  <Button
                    style={{width: 'fit-content'}}
                    text='Go'
                    color='green'
                    span
                  />
                </div>
              )
            })}
          </div>
          <div className={s.right}>
            <div className={s.mapProxy}/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StoreLocations