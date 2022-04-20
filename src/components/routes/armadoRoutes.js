import {Route, Routes} from "react-router-dom"
import ArmadoHome from "../armado/index"
import InputArmado from "../armado/inputsArmado"
const ArmadoRoutes = () => {
  return(
    <>
      <Routes>
        <Route path = "/relevamiento" element = {<InputArmado/>}/>
        <Route path = "/" element = {<ArmadoHome/>}/>
      </Routes>
      
    </>
  )
}
export default ArmadoRoutes