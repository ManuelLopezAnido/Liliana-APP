import {Route, Routes} from "react-router-dom"
import InputAbastecimiento from "../abastecimiento/inputs"
import AbastecimientoHome from "../abastecimiento/index"
import TablasAbastecimiento from "../abastecimiento/tables"
const DepositoRoutes = () => {
  return(
    <>
       <Routes>
        <Route path = "/relevamiento" element = {<InputAbastecimiento/>}/>
        <Route path = "/tablas" element = {<TablasAbastecimiento/>}/>
        <Route path = "/" element = {<AbastecimientoHome/>}/>
      </Routes>
    </>
  )
}
export default DepositoRoutes