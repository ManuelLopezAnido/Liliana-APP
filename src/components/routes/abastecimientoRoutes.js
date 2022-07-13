import {Route, Routes} from "react-router-dom"
import InputAbastecimiento from "../abastecimiento/inputs"
import AbastecimientoHome from "../abastecimiento/index"
import TablasAbastecimiento from "../abastecimiento/tables"
import CriticosAbastecimiento from "../abastecimiento/criticos"
import HistorialAbastecimiento from "../abastecimiento/historial"
import ActualizarAbastecimiento from "../abastecimiento/actualizar"
const DepositoRoutes = () => {
  return(
    <>
       <Routes>
        <Route path = "/relevamiento" element = {<InputAbastecimiento/>}/>
        <Route path = "/tablas" element = {<TablasAbastecimiento/>}/>
        <Route path = "/criticos" element = {<CriticosAbastecimiento/>}/>
        <Route path = "/historial" element = {<HistorialAbastecimiento/>}/>
        <Route path = "/actualizar" element = {<ActualizarAbastecimiento/>}/>
        <Route path = "/" element = {<AbastecimientoHome/>}/>
      </Routes>
    </>
  )
}
export default DepositoRoutes