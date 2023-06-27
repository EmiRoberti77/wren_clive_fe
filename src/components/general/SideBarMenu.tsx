import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import { ISideBarMenu } from './SideBarData';

interface SideBarMenuProps {
  menuItem: ISideBarMenu
}

const SideBarMenu: React.FC<SideBarMenuProps> = ({ menuItem }) => {
  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  const { name, icon, path } = menuItem

  const onExpand = () => {
    if (menuItem.submenu)
      setShow(!show)
    else
      navigate(menuItem.path)
  }

  return (
    <li onClick={onExpand}>
      <a className='nav-link px2 nav-item'>
        <i className={icon}><span className='ms-1 d-none d-sm-inline'>{name}</span></i>
      </a>
      {show ?
        <ul className='sub-menu'>
          {menuItem.submenu?.map((item, index) => {
            return <SideBarMenu key={index} menuItem={item} />
          })}
        </ul>
        : ''}
    </li>
  )
}

export default SideBarMenu
