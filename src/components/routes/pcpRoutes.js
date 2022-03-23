import {Route, Routes} from "react-router-dom"
import CambiosDeTurno from "../pcp app/cambios de turno"
import PcpApp from '../pcp app/index'
import Macros from "../pcp app/macros"
import Produccion from "../pcp app/produccion"
const PcpRoutes = () => {
 
  return (
    <Routes>
      <Route path = "/produccion" element = {<Produccion/>}/>
      <Route path = "/cambio-de-turno" element = {<CambiosDeTurno/>}/>
      <Route path = "/macros" element = {<Macros/>}/>
      <Route path = "/" element = {<PcpApp/>}/>
    </Routes>
  )
}
export default PcpRoutes