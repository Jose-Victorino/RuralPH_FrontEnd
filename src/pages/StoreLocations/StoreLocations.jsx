import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import cn from 'classnames'

import useDocumentTitle from '@/hooks/useDocumentTitle'

import s from './StoreLocations.module.scss'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const PAGE_NAME = 'Locations'
const MAP_CENTER = [14.5547, 121.0244]
const STORES = [
  // {
  //   name: 'RURI NORTH',
  //   address: '22 Congressional Avenue, Project 8, Quezon City (infront of Congressional Town Center)',
  //   email: 'hello@ruralrisingph.com',
  //   contact: '09171667787',
  //   coords: [14.670968207791924, 121.04003655653963],
  // },
  {
    name: 'RURI WEST',
    address: 'West Triangle, 79 Sgt. Esguerra Ave, Diliman, Quezon City, 1103 Metro Manila',
    email: 'hello@ruralrisingph.com',
    contact: '09171667787',
    coords: [14.643758931765877, 121.0348473957664],
  },
  {
    name: 'RURI CENTRAL',
    address: 'G/F Tower 1, Avida Towers Centera, EDSA cor. Reliance Street, Mandaluyong, 1550 Metro Manila',
    email: 'hello@ruralrisingph.com',
    contact: '09175027787',
    coords: [14.576851188709611, 121.05119672460069],
  },
  {
    name: 'RURI SOUTH',
    address: 'Old Transport Terminal Bldg., Alabang Town Center, Theater Dr., Ayala Alabang, Muntinlupa.',
    email: 'hello@ruralrisingph.com',
    contact: '09688587787',
    coords: [14.423895938459083, 121.03178805738112],
  },
]

function StoreLocations() {  
  useDocumentTitle(`${PAGE_NAME} | Rural Rising PH`)

  return (
    <section className='container flex-col gap-20 pad-block-60'>
      <div className={s.main}>
        <ul className={s.storeList}>
          {STORES.map((store) =>
            <li key={store.name}>
              <h5 className='textYellow'>{store.name}</h5>
              <div>
                <p>Address: {store.address}</p>
                <p>Email: {store.email}</p>
                <p>Contact: {store.contact}</p>
              </div>
            </li>
          )}
        </ul>
        <div className={s.mapWrapper}>
          <MapContainer
            center={MAP_CENTER}
            zoom={11}
            style={{ height: '100%', minHeight: '400px' }}
          >
            <TileLayer
              // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {STORES.map((store) => (
              <Marker key={store.name} position={store.coords}>
                <Popup>
                  <strong>{store.name}</strong><br />
                  {store.address}<br />
                  {store.contact}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  )
}

export default StoreLocations