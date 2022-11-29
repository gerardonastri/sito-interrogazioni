import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './EstrazioneForm.css'
import {axiosReq} from "../../utils/apiCalls"
import {AiOutlineClose} from 'react-icons/ai'

const EstrazioneForm = ({setShowForm}) => {

    const [quantita, setQuantita] = useState("")
    const [materia, setMateria] = useState("")

    const handleSubmit = async () => {
        try {
            const users = await axiosReq.get(`user/interrogazione?materia=${materia}`)
            const res = await axiosReq.post("estrazione", {
                users: users.data,
                quantita,
                materia,
                data: Date.now()
            })
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='estrazioneForm'>
        <h3>Estrai interrogati</h3>
        <span className='close' onClick={() => setShowForm(false)}><AiOutlineClose /></span>
        <div className="inputGroup">
            <label htmlFor="quantita">Quantità</label>
            <input type="text" name='quantità' value={quantita} onChange={(e) => setQuantita(e.target.value)} />
        </div>
        <div className="inputGroup">
            <label htmlFor="materia">Materia</label>
            <input type="text" name='materia' value={materia} onChange={(e) => setMateria(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Estrai</button>
    </div>
  )
}

export default EstrazioneForm