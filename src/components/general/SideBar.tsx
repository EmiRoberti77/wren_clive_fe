import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/SideBar.css'
import { SideBarData } from './SideBarData'
import SideBarMenu from './SideBarMenu'

const SideBar:React.FC = () => {

  return (
    <div className='sidebar-menu'>
      <div className='side-logo'>
     <img  src="/VAS_Logo.png" 
      alt="VAS Logo" 
      width="150" 
      height="100">
        </img>
        </div>
        <div className='Sidebar-list-menu'>
            <ul className='no-bullet'>
              {SideBarData.map((item, key)=>{ return <SideBarMenu key={key} menuItem={item}/>})}
            </ul>
        </div>
    </div>
  )
}

export default SideBar