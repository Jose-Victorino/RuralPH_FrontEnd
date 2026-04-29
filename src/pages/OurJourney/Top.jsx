import { useNavigate, useParams } from 'react-router'
import { journeyCategoryHooks } from '@/service/crudService'

import s from './Top.module.scss'

function Header() {
  const navigate = useNavigate()
  const { categoryId } = useParams()

  const { data: { data: categoryData = [] } = {} } = journeyCategoryHooks.getAll()

  const handleChange = ({ value }) => {
    navigate(`/our-journey${value == '' ? '' : `/c/${value}`}`)
  }

  return (
    <div data-ros='fade-down' className={s.header}>
      <div className='flex gap-10'>
        <p>Category</p>
        <select name="catagory" id="catagory" value={categoryId} onChange={(e) => handleChange(e.target)}>
          <option value="">All</option>
          {categoryData.map(({ id, name }) =>
            <option key={id} value={id}>{name}</option>
          )}
        </select>
      </div>
    </div>
  )
}

export default Header