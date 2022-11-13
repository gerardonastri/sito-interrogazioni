import React from 'react'
import './Home.css'
import homeBg from '../../images/bg-1.jpeg'
import { useState } from 'react'
import { useEffect } from 'react'
import { axiosReq } from '../../utils/apiCalls'
import Estrazione from '../../components/Estrazione/Estrazione'

const Home = () => {

  const [estrazione, setEstrazione] = useState(null)
  

  useEffect(() => {
    const getEstrazione = async () => {
      try {
        const res = await axiosReq.get("estrazione")
        setEstrazione(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getEstrazione()
  }, [])



  return (
    <div className='home'>
      <div className="home__bg">
        <img src={homeBg} alt="" />
      </div>
      <div className="home__container">
        <Estrazione estrazione={estrazione && estrazione} />
      </div>
    </div>
  )
}

export default Home