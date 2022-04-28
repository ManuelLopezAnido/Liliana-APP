import { Routes,Route } from "react-router-dom"
import DepositoHome from "../deposito/index"
import TablasDeposito from '../deposito/tables'
import InputDeposito from "../deposito/inputs"
const DepositoRoutes = () => {
  return(
    <>
       <Routes>
        <Route path = "/relevamiento" element = {<InputDeposito/>}/>
        <Route path = "/tablas" element = {<TablasDeposito/>}/>
        <Route path = "/" element = {<DepositoHome/>}/>
      </Routes>
    </>
  )
}
export default DepositoRoutes