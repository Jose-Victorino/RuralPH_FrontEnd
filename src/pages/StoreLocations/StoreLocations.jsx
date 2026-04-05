import cn from 'classnames'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { useFormik } from 'formik'

import Button from '@/components/Button/Button'

import s from './StoreLocations.module.scss'

import car from 'svg/car.svg'
import transit from 'svg/bus.svg'
import walking from 'svg/person-walking.svg'
import bicycle from 'svg/bicycle.svg'

const STORES = [
  {
    id: 'central 1',
    name: 'Rural Rising Philippines - Central',
    address: 'Avida Towers Centera Retail, Epifanio de los Santos Ave, Mandaluyong, 1550 Metro Manila',
    email: 'hello@ruralrisingph.com',
    contact: '09175027787',
  },
  {
    id: 'north',
    name: 'RURI NORTH',
    address: '22 Congressional Avenue, Project 8, Quezon City (infront of Congressional Town Center)',
    email: 'hello@ruralrisingph.com',
    contact: '09171667787',
  },
  {
    id: 'south',
    name: 'RURI SOUTH',
    address: 'Old Transport Terminal Bldg., Alabang Town Center, Theater Dr., Ayala Alabang, Muntinlupa.',
    email: 'hello@ruralrisingph.com',
    contact: '09688587787',
  },
  {
    id: 'central 2',
    name: 'RURI CENTRAL',
    address: 'G/F Tower 1, Avida Towers Centera, EDSA cor. Reliance Street, Mandaluyong, M.M.',
    email: 'hello@ruralrisingph.com',
    contact: '09175027787',
  },
]
const VIEW_TYPES = ['map', 'street']
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
const PAGE_NAME = 'Locations'

function StoreLocations() {  
  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)

  const { values, setFieldValue, isSubmitting, handleSubmit, handleChange} = useFormik({
    initialValues: {
      store: STORES[0]?.id ?? '',
      view: VIEW_TYPES[0] ?? '',
      mode: MODE_TYPES[0].name ?? '',
      location: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const selectedStore = STORES.find((s) => s.id === values.store)

  return (
    <section className={s.locationContainer}>
      <div className={cn(s.main, 'container pad-block-60')}>
        <form className={s.form} onSubmit={handleSubmit}>
          <select
            name="store"
            value={values.store}
            onChange={handleChange}
            className={s.input}
          >
            {STORES.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
          {selectedStore &&
            <div>
              <p>Address: {selectedStore.address}</p>
              <p>Email: {selectedStore.email}</p>
              <p>Contact: {selectedStore.contact}</p>
            </div>
          }
          <div className={cn('flex gap-15', s.view)}>
            {VIEW_TYPES.map((v) => (
              <button
                key={v}
                type="button"
                aria-selected={values.store === v}
                onClick={() => setFieldValue('view', v)}
              >
                {v}
              </button>
            ))}
          </div>
          <ul className={s.mode}>
            {MODE_TYPES.map((m) => {
              const isSelected = values.mode === m.name
              return (
                <li
                  key={m.name}
                  className={cn({[s.selected]: isSelected})}
                  aria-selected={isSelected}
                  title={m.title}
                >
                  <div className={s.checkMark} aria-hidden>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                      <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFieldValue('mode', m.name)}
                  >
                    <img src={m.svg} loading='lazy' alt={m.name}/>
                  </button>
                </li>
              )
            })}
          </ul>
          <input className={s.input} type="text" name='location' placeholder="Enter Location" value={values.location} onChange={handleChange} autoComplete='off' required/>
          <Button
            type="submit"
            style={{width: 'fit-content'}}
            text='Go'
            color='green'
            disable={isSubmitting}
            span
          />
        </form>
        <div className={s.mapCont}>
          <div className={s.mapProxy}/>
        </div>
      </div>
    </section>
  )
}

export default StoreLocations