import React, {useEffect, useState} from 'react'
import './UserDetails.css'
import {BiSearchAlt2} from 'react-icons/bi'
import {MdNotifications} from 'react-icons/md'
import {AiFillMail} from 'react-icons/ai'
import {axiosReq} from '../../utils/apiCalls'
import {useSelector} from 'react-redux'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import {useLocation} from 'react-router-dom'
import Moment from 'react-moment'


const UserDetails = () => {

    const [user, setUser] = useState(null)
    const currentUser = useSelector(state => state.currentUser)
    const id = useLocation().pathname.split('/')[3]

    useEffect(() => {
        const pushUser = async () => {
            if(!currentUser?._id || !currentUser?.isAdmin){
                window.location.replace("/")
            } else {
                try {
                    const res = await axiosReq.get(`user/find/${id}`)
                    setUser(res.data)
                } catch (error) {
                    console.log(error);
                }
            }
        }
        pushUser()
    }, [currentUser, id])

  return (
    <div className="admin userDetails">
        <AdminSidebar />
        <div className='adminMain'>
        {/*ADMIN NAVBAR*/}
        <div className={"adminMain__navbar"}>
            <div className="adminMain__navbar-search">
            <BiSearchAlt2 />
            <input type="text" name="" placeholder='Search here...' />
            </div>
            <div className="adminMain__navbar-info">
            <h3>{currentUser?.nome} {currentUser?.cognome}</h3>
            <span className='showEstrazioneForm'>Estrazione</span>
            <MdNotifications />
            <AiFillMail />
            </div>
        </div>
        {/*ADMIN CONTENT*/}
        <div className={"adminMain__content"}>
            <div className="adminMain__content-item">
                <h2>{user?.nome} {user?.cognome}</h2>
                <div className="userDetails__fields">
                    <h3>nome</h3>
                    <h3>cognome</h3>
                    <h3>email</h3>
                    <h3>Interrogato Questa Settimana</h3>
                    <h3>Admin</h3>
                </div>
                <div className="userDetails__items">
                    <span>{user?.nome}</span>
                    <span>{user?.cognome}</span>
                    <span>{user?.email.split("@")[0]}</span>
                    <span>{!user?.interrogatoQuestaSettimana ? "no" : "si"}</span>
                    <span>{!user?.isAdmin ? "no" : "si"}</span>
                </div>
            </div>
            <div className="adminMain__content-item">
                <h2>Interrogazioni</h2>
                <div className="userDetails__fields">
                    <h3>interrogazioni fatte</h3>
                    <h3>interrogazioni da fare</h3>
                </div>
                <div className="userDetails__items">
                    <div className="userDetails__items-interrogazioni">
                        {user?.interrogazioniFatte.map((interrogazione, i) => (
                            <span>{i} {interrogazione.materia} 
                            <Moment format="DD/MM/YYYY">
                            {interrogazione.data}
                            </Moment></span>
                        ))}
                    </div>
                    <div className="userDetails__items-interrogazioni">
                        {user?.interrogazioniDaFare.map((interrogazione, i) => (
                            <span>{interrogazione.materia} 
                            <Moment format="DD/MM/YYYY">
                            {interrogazione.data}
                            </Moment></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default UserDetails