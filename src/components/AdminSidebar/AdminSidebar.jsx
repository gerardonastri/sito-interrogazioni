import React from 'react'
import './AdminSidebar.css'
import {AiOutlineHome} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {AiOutlineAppstore} from 'react-icons/ai'

const AdminSidebar = () => {
  return (
    <div className='adminSidebar'>
      <h1>Extractor</h1>
      <div className="adminSidebar__links">
        <a href="/admin">
          <AiOutlineHome /> Dashboard
        </a>
        <a href="/admin/users">
          <AiOutlineUser /> User
        </a>
        <a href="/admin/estrazioni">
          <AiOutlineAppstore /> Estrazioni
        </a>
      </div>
    </div>
  )
}

export default AdminSidebar