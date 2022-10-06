import { Routes,Route } from "react-router-dom"
import MatriceriaHome from "../matriceria/index"
import TablasMatriceria from '../matriceria/tables'
import InputMatriceria from "../matriceria/inputs"
import ActualizarAbastecimiento from "../abastecimiento/actualizar"

const MatriceriaRoutes = () => {
  return(
    <>
       <Routes>
        <Route path = "/relevamiento" element = {<InputMatriceria/>}/>
        <Route path = "/tablas" element = {<TablasMatriceria/>}/>
        <Route path = "/actualizar" element = {<ActualizarAbastecimiento/>}/>
        <Route path = "/" element = {<MatriceriaHome/>}/>
      </Routes>
    </>
  )
}
export default MatriceriaRoutes