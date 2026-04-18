import React from 'react'
import { NavLink } from 'react-router'
import cn from 'classnames'

import s from './Breadcrumbs.module.scss'

function Breadcrumbs({ crumbs }) {
  
  return (
    <section className={s.breadcrumbs}>
      {crumbs.map((c, i) => (
        <React.Fragment key={c.path}>
          <NavLink
            to={c.path}
            end
            className={({ isActive }) => cn({ [s.active]: isActive })}
          >
            {c.label}
          </NavLink>

          {i < crumbs.length - 1 &&
            <span className={s.divider}>/</span>
          }
        </React.Fragment>
      ))}
    </section>
  )
}

export default Breadcrumbs