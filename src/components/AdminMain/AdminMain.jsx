import React, { useEffect, useState } from 'react'
import './AdminMain.css'
import {BiSearchAlt2} from 'react-icons/bi'
import {MdNotifications} from 'react-icons/md'
import {AiFillMail} from 'react-icons/ai'
import img from '../../images/user.png'
import {axiosReq} from '../../utils/apiCalls'
import Moment from 'react-moment'
import EstrazioneForm from '../EstrazioneForm/EstrazioneForm'


const AdminMain = ({currentUser}) => {

  const [users, setUsers] = useState(null)
  const [estrazione, setEstrazione] = useState(null)

  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosReq.get("user")
        const res2 = await axiosReq.get("estrazione")
        setUsers(res.data)
        setEstrazione(res2.data)
      } catch (error) {
        console.log(error);
      }
    }
    getUsers()
  },[])


  return (
    <div className='adminMain'>
      {/*ADMIN NAVBAR*/}
      <div className={showForm ? "adminMain__navbar blurred": "adminMain__navbar"}>
        <div className="adminMain__navbar-search">
          <BiSearchAlt2 />
          <input type="text" name="" placeholder='Search here...' />
        </div>
        <div className="adminMain__navbar-info">
          <h3>{currentUser?.nome} {currentUser?.cognome}</h3>
          <span className='showEstrazioneForm' onClick={() => setShowForm(true)}>Estrazione</span>
          <MdNotifications />
          <AiFillMail />
        </div>
      </div>
      {/*ADMIN CONTENT*/}
      <div className={showForm ? "adminMain__content blurred": "adminMain__content"}>
        <div className="adminMain__content-item">
          <h2>Users</h2>
          {users?.map(user => (
            <a href={`/admin/user/${user._id}`} className="adminMain__content-user">
              <div className="user__img">
                <img src={img} alt="" />
              </div>
              <h3>{user.nome} {user.cognome}</h3>
            </a>
          ))}
        </div>
        <div className="adminMain__content-item">
          {estrazione ? (
            <>
              <h2>Estrazione</h2>
              <div className="estrazione__fields">
                <h3>Estratti</h3>
                <h3>Orario</h3>
              </div>
              <div className="estrazione__items">
                <div className="estrazione__items-estratti">
                  {estrazione?.estratti.map(estratto => (
                    <span>{estratto.nome} {estratto.cognome}</span>
                  ))}
                </div>
                <span>
                  <Moment format="DD/MM/YYYY, hh:mm">
                    {estrazione?.orarioEstrazione}
                  </Moment>
                </span>
              </div>
            </>
          ) : (
            <h2 className='adminMain__content-noItem'>Non ?? stata effettuata nessuna estrazione</h2>
          )}
        </div>
      </div>
      {showForm && (
        <EstrazioneForm setShowForm={setShowForm} />
      )}
    </div>
  )
}

export default AdminMain