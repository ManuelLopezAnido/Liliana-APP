import {Route, Routes} from "react-router-dom"
import CambiosDeTurno from "../pcp app/cambios de turno"
import PcpApp from '../pcp app/index'
import Macros from "../pcp app/macros"
import Produccion from "../pcp app/produccion"
import { useEffect, useState } from 'react';
const PcpRoutes = () => {
  const [data, setData] = useState([])
  useEffect (()=>{
    fetch('http://192.168.11.139'+ process.env.serverPORT +'/')
      .then((res)=>res.json())
      .then ((json)=>{
        setData (json)
      })
      .catch (err => console.log(err))
  },[])
  console.log('data is: ', data)
  return (
    <Routes>
      <Route path = "/produccion" element = {<Produccion data={data}/>}/>
      <Route path = "/cambio-de-turno" element = {<CambiosDeTurno/>}/>
      <Route path = "/macros" element = {<Macros/>}/>
      <Route path = "/" element = {<PcpApp/>}/>
    </Routes>
  )
}
export default PcpRoutes