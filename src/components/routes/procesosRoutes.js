import {Route, Routes} from "react-router-dom"
import Produccion from "../pcp app/produccion"

// import AdminView from "../procesos/vistaAdmin/AdminView"
// import UserView from "../procesos/vistaUser/UserView"
// import { Procesos } from "../procesos/index"
const ProcesosRoutes = () => {
   return (
    <Routes>
      <Route path = "/produccion" element = {<Produccion/>}/>
      {/* <Route path = "/" element = {<Procesos/>}/>
      <Route path='/admin' element={<AdminView/>}/>
      <Route path='/user:user' element={<UserView/>}/> */}
    </Routes>
  )
}
export default ProcesosRoutes