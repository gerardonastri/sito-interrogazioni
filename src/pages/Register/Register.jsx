import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { axiosReq } from '../../utils/apiCalls'
import { loginSuccess } from '../../redux/userSlice'
import bg from '../../images/home-bg.jpeg'
import './Register.css'


const Register = () => {

  const [nome, setNome] = useState("")
  const [cognome, setCognome] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    const emailSchool = email.split("@")[1]
    if(emailSchool !== "issmargheritahackbaronissi.edu.it"){
      setError("Devi usare l'email della scuola")
    } else {
      try {
        const res = await axiosReq.post("auth/register", {
          nome,
          cognome,
          telefono,
          email,
          password
        })
        dispatch(loginSuccess(res.data))
        window.location.replace("/")
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className='register'>
      <div className="register__content">
        <div className="register__left">
          <h1>Register</h1>
          <div className="register__left-form">
            <h3>Inserisci i tuoi dati personali</h3>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="nome" />
            <input type="text" value={cognome} onChange={(e) => setCognome(e.target.value)} placeholder="cognome" />
            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="numero di telefono" />
          
            <h3>Crea account</h3>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e-mail" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            <div className="form-btn">
              <button onClick={handleSubmit}>Registrati</button>
            </div>
            <p className="error">{error}</p>
          </div>
        </div>
        <div className="register__right">
          <div className="login__left-bg">
            <img src={bg} alt="" />
          </div>
          <div className="register__right-text">
            <h1>Sei già registrato?</h1>
            <h3>Clicca sul pulsante e accedi al tuo <br /> account personale</h3>
            <button>accedi</button>
            <span>oppure</span>
            <a href="/">torna alla home page</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register