import React, {useEffect} from 'react'
import './Admin.css'
import {useSelector} from 'react-redux'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import AdminMain from '../../components/AdminMain/AdminMain'

const Admin = () => {

    const currentUser = useSelector(state => state.currentUser)

    useEffect(() => {
        const pushUser = () => {
            if(!currentUser?._id || !currentUser?.isAdmin){
                window.location.replace("/")
            }
        }
        pushUser()
    }, [currentUser])

  return (
    <div className='admin'>
        <AdminSidebar />
        <AdminMain currentUser={currentUser} />
    </div>
  )
}

export default Admin