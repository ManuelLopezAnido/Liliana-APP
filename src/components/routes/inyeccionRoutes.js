import InputInyeccion from "../inyeccion/input"
import InyeccionHome from "../inyeccion/index"
import { Routes, Route } from "react-router-dom"
import InyeccionTables from "../inyeccion/tables"
const InyeccionRoutes = () => {
  return(
    <Routes>
        <Route path = "/relevamiento" element = {<InputInyeccion/>}/>
        <Route path = "/tablas" element = {<InyeccionTables/>}/>
        <Route path = "/" element = {<InyeccionHome/>}/>
    </Routes>
  )
}
export default InyeccionRoutes