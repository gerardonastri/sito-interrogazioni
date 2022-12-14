import React from 'react'
import './Navbar.css'
import logoImg from '../../images/logo2.png'
import { useState } from 'react'
import { logout } from '../../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'


const Navbar = () => {
  const [isActive, setIsActive] = useState(false)
  const isHome = window.location.pathname.split('/')
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser)


  const handleLogout = async () => {
    if(window.confirm("Sei sicuro di voler fare il logout?")){
      dispatch(logout())
      window.location.replace("/")
    }
  }

  return (
    <div className={isHome[1].length === 0 ? "navbar navbar__home" :'navbar'}>
      <div className="navbar__wrapper">
        <a href="/">Home</a>
        <a className="navbar__img" href="/">
          <img src={logoImg} alt="" />
        </a>
        <div className='hamburger' onClick={() => {
          setIsActive(prev => !prev);
          }}>
          <span className={isActive ? 'bar active' : 'bar'}></span>
          <span className={isActive ? 'bar active' : 'bar'}></span>
          <span className={isActive ? 'bar active' : 'bar'}></span>
        </div>
      </div>
      <div className={isActive ?  "navbar__sidebar show" : "navbar__sidebar"}>
        <div className="navbar__sidebar-links">
          {currentUser ? (
            <>
            <a href="#" onClick={handleLogout}>Logout</a>
            <a href="/details">Interrogazioni</a>
            </>
          ) : (
            <a href="/login">Login</a>
          )}
          {/* <a href="/">Contatti</a>
          <a href="/">Servizi</a> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar
