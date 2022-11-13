import React, {useState} from 'react'
import './Interrogazione.css'
import {SlOptionsVertical} from 'react-icons/sl'
import {GrEdit} from 'react-icons/gr'
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import {MdDelete} from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'
import Moment from 'react-moment'

const Interrogazione = ({interrogazione, type, deleteInterrogazione, completaInterrogazione}) => {

    const [showActions, setShowActions] = useState(false);

  return (
    <div className="details__content-interrogazione">
        <span>{interrogazione.materia}</span>
        <div className="details__content-interrogazione_details">
            <span className="data">
              <Moment format="DD/MM/YYYY">
                  {interrogazione.data}
              </Moment>
            </span>
            <SlOptionsVertical onClick={() => setShowActions(true)} />
            <div className={showActions ? "details__interrogazione-actions show" : "details__interrogazione-actions"}>
                <span className='close' onClick={() => setShowActions(false)}><AiOutlineClose /></span>
                {type === "notCompleted" && (
                  <span onClick={() => completaInterrogazione(interrogazione.materia, interrogazione.data, interrogazione._id)}><IoMdCheckmarkCircleOutline /> Interrogazione Completata</span>
                )}
                <span><GrEdit /> Modifica Interrogazione</span>
                <span onClick={() => deleteInterrogazione(type, interrogazione._id)}><MdDelete /> Elimina Interrogazione</span>
            </div>
        </div>
    </div>
  )
}

export default Interrogazione