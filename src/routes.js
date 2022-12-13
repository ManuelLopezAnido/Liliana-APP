
import ProcesosRoutes from './components/routes/procesosRoutes'
import InyeccionRoutes from './components/routes/inyeccionRoutes.js'
import AbastecimientoRoutes from './components/routes/abastecimientoRoutes.js'
import DepositoRoutes from './components/routes/depositoRoutes.js'
import ArmadoRoutes from './components/routes/armadoRoutes.js'
import Layout from './components/layout/layout'
import Login from './components/login/login'
import NotAuthorized from './components/commonComponents/notAuthorized'
import {Routes, Route, Navigate} from 'react-router-dom'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Navigate replace to="/login" />} />
        <Route path='/procesos/*' element = {<ProcesosRoutes/>}/>
        <Route path='/inyeccion/*' element = {<InyeccionRoutes/>}/>
        <Route path='/abastecimiento/*' element = {<AbastecimientoRoutes/>}/>
        <Route path='/deposito/*' element = {<DepositoRoutes/>}/>
        <Route path='/armado/*' element={<ArmadoRoutes/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/notAuthorized' element={<NotAuthorized/>}/>
        <Route path="/*" element={<Navigate replace to="/login" />}/>
      </Route>
    </Routes>
  )
}
export default AppRoutes