import InputInyeccion from "../inyeccion/input"
import InyeccionHome from "../inyeccion/index"
import { Routes, Route } from "react-router-dom"
import InyeccionTables from "../inyeccion/tables"
import { CompTableInyectoras } from "../inyeccion/reparaciones/maquinas/CompTableInyectoras"
import { CompTableMatriceria } from "../inyeccion/reparaciones/moldes/CompTableMatriceria"
import { FormReparar, FormVerificado, FormVisualizar, OrdenDetallada } from "../inyeccion/reparaciones/componentes"
import { FormCreateMatriceria } from "../inyeccion/reparaciones/moldes/FormCreateMatriceria"
import { FormCreateInyectoras } from "../inyeccion/reparaciones/maquinas/FormCreateManInyectoras"

const InyeccionRoutes = () => {
  return(
    <Routes>
        <Route path = "/relevamiento" element = {<InputInyeccion/>}/>
        <Route path = "/tablas" element = {<InyeccionTables/>}/>
        <Route path = "/maquinas" element = {<CompTableInyectoras/>}/>
        <Route path = "/moldes" element = {<CompTableMatriceria/>}/>


        <Route path = "/moldes/crear" element = {< FormCreateMatriceria/>}/>
        <Route path = "/maquinas/crear" element = {< FormCreateInyectoras/>}/>
        
        <Route path = "/:tabla/notificar/:id" element = {<FormVisualizar/>}/>
        <Route path = "/:tabla/reparar/:id" element = {<FormReparar/>}/>
        <Route path = "/:tabla/verificar/:id" element = {<FormVerificado/>}/>
        <Route path = "/:tabla/detalle/:id" element = {<OrdenDetallada/>}/>

        

        <Route path = "/" element = {<InyeccionHome/>}/>
    </Routes>
  )
}
export default InyeccionRoutes