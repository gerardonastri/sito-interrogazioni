import React, {useState, useEffect} from 'react'
import Moment from 'react-moment'
import './Estrazione.css'

const Estrazione = ({estrazione}) => {

  const [showExtractions, setShowExtractions] = useState(true);
  const [showExtractionTime, setShowExtractionTime] = useState(false);

  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowExtractions(prev => !prev)
      setShowExtractionTime(prev => !prev)
    }, 3500)

    return () => clearInterval(intervalId);
  }, [showExtractions, showExtractionTime])


  return (
    <div className="extraction__container">
        {estrazione ? (
            <>
                <div className="extraction">
                    <h1 className={showExtractions && "show"}>Nomi Estratti</h1>
                    <div className="extraction__content">
                        {estrazione?.estratti?.map((estratto, i) => (
                            <>
                                {i  === 0 ? (
                                    <h3 className={showExtractions ? "extraction__info show"  : "extraction__info"}>{estratto.nome} {estratto.cognome}</h3>
                                ) : (
                                <>
                                    <div className={showExtractions ? "divider show" : "divider"}></div>
                                    <h3 className={showExtractions ? "extraction__info show"  : "extraction__info"}>{estratto.nome} {estratto.cognome}</h3>
                                </>
                                )}
                            </>
                        ))}
                    </div>
                </div>
                <div className="extractionTime">
                    <h1 className={!showExtractions && "show"}>orario di estrazione</h1>
                    <div className="extractionTime__content">
                        <h3 className={!showExtractions ? "extraction__info show"  : "extraction__info"}>
                            <Moment format="hh">
                            {estrazione?.createdAt}
                            </Moment>
                        </h3>
                        <div className={!showExtractions ? "vertical-divider show" : "vertical-divider"}></div>
                        <h3 className={!showExtractions ? "extraction__info show"  : "extraction__info"}>
                            <Moment format="mm">
                            {estrazione?.createdAt}
                            </Moment>
                        </h3>
                    </div>
                </div>
            </>
        ) : (
            <h1>L'estrazione ancora deve avvenire</h1>
        )}
        
    </div>
  )
}

export default Estrazione