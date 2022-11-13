import React, {useState} from 'react'
import './NewDetails.css'
import homeBg from '../../images/bg-2.jpeg'
import Interrogazione from '../../components/Interrogazione/Interrogazione'
import {useSelector} from 'react-redux'
import {axiosReq} from '../../utils/apiCalls'
import { useEffect } from 'react'

const NewDeatils = () => {

    const [user, setUser] = useState(null)
    //implementare questo state con un componente così che ogni interrogazione possa avere le sue azioni e modificare se stessa
    const currentUser = useSelector(state => state.currentUser)

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axiosReq.get(`user/find/${currentUser._id}`)
                setUser(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    }, [currentUser._id])

    //completa interrogazione
    const completaInterrogazione = async ( materia, data, interrogazioneId) => {
        try {
            const res = await axiosReq.post(`user/completaInterrogazione/${user._id}`, {
                materia,
                data,
                interrogazioneId: interrogazioneId
            })
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
    //eliminare interrogazione
    const deleteInterrogazione = async (type, interrogazioneId) => {
        try {
            const res = await axiosReq.post(`user/deleteInterrogazione/${user._id}`, {
                type,
                interrogazioneId: interrogazioneId
            })
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='details' >
        <div className="home__bg">
            <img src={homeBg} alt="" />
        </div>
        <div className="details__container" >
            <div className="details__content">
                <h1>Extraction</h1>
                <div className="details__content-notCompleted">
                    <h3>Interrogazioni da completare</h3>
                    {user?.interrogazioniDaFare?.map(interrogazione => (
                        <Interrogazione interrogazione={interrogazione} type="notCompleted" deleteInterrogazione={deleteInterrogazione} completaInterrogazione={completaInterrogazione} />
                    ))}
                </div>
                <div className="details__content-completed">
                    <h3>Interrogazioni completate</h3>
                    {user?.interrogazioniFatte?.map(interrogazione => (
                        <Interrogazione interrogazione={interrogazione} type="completed" deleteInterrogazione={deleteInterrogazione} completaInterrogazione={completaInterrogazione} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewDeatils