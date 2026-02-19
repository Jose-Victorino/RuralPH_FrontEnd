import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import s from './Top.module.scss'

function Header() {
  const navigate = useNavigate()
  const { categoryName } = useParams();

  const handleChange = ({ value }) => {
    navigate(`/our-journey${value == '' ? '' : `/c/${value}`}`)
  }

  return (
    <section>
      <div className="container pad-block-20">
        <div className={s.header}>
          <div>
            <input type="text" placeholder='Search...'/>
          </div>
          <div className='flex gap-10'>
            <p>Category</p>
            <select name="catagory" id="catagory" value={categoryName} onChange={(e) => handleChange(e.target)}>
              <option value="">All</option>
              <option value="capacity-building">Capacity Building</option>
              <option value="tourism">Tourism</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header