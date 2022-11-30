import React from 'react'
import './Login.css'
import {useDispatch} from 'react-redux'
import {loginStart, loginSuccess, loginFailure, logout} from '../../redux/userSlice'
import {auth, provider} from '../../utils/firebase'
import {signInWithPopup} from 'firebase/auth'
import { axiosReq } from '../../utils/apiCalls'
import bg from '../../images/home-bg.jpeg'
import { useState } from 'react'


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  const signInWithGoogle = async () => {
    dispatch(loginStart())
    signInWithPopup(auth, provider).then(result => {
        axiosReq.post('auth/google', {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
        }).then((res) => {
            dispatch(loginSuccess(res.data))
        })
        
    }).catch((error) => {
        dispatch(loginFailure())
    })
  }

  const handleSubmit = async () => {
    if(email.length > 0 && password.length > 0){
      try {
        const res = await axiosReq.post("auth/login", {
          email,
          password
        })
        dispatch(loginSuccess(res.data))
        window.location.replace("/")
      } catch (error) {
        if(error.response.status){
          setError("Email o Password errata")
        }
      }
    } else {
      setError("Compila tutti i campi")
    }
  }

  return (
    <div className='login'>
      {/* <button onClick={signInWithGoogle}>Sign in with google</button> */}
      <div className="login__left">
        <div className="login__left-bg">
          <img src={bg} alt="" />
        </div>
        <div className="login__left-text">
          <h1>Sei un nuovo utente?</h1>
          <p>crea il tuo personale account dove potrai gestire interrogazioni e impegni</p>
          <a href="/register">
            <button>register</button>
          </a>
          <span>oppure</span>
          <a href="/">torna alla home page</a>
        </div>
      </div>
      <div className="login__right">
        <div className="login__right-form">
          <h1>Log-In</h1>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="******" />
          </div>
          <div className="form-btn">
            <button onClick={handleSubmit}>Log-in</button>
          </div>
          <p className="error">{error}</p>
        </div>
      </div>
    </div>
  )
}

export default Login