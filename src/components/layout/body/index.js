import styles from './body.module.css'
import PcpRoutes from '../../routes/pcpRoutes.js'
import InyeccionRoutes from '../../routes/inyeccionRoutes.js'
import AbastecimientoRoutes from '../../routes/abastecimientoRoutes.js'
import DepositoRoutes from '../../routes/depositoRoutes.js'
import ArmadoRoutes from '../../routes/armadoRoutes.js'
import {Routes,Route, Navigate } from 'react-router-dom'

const Body = () => {
  return (
  <section className={styles.content}>
    <Routes>
      <Route path='/pcp/*' element = {<PcpRoutes/>}/>
      <Route path='/inyeccion' element = {<InyeccionRoutes/>}/>
      <Route path='/abastecimiento' element = {<AbastecimientoRoutes/>}/>
      <Route path='/deposito' element = {<DepositoRoutes/>}/>
      <Route path='/armado/*' element={<ArmadoRoutes/>}/>
      <Route path="*" element={<Navigate replace to="/pcp" />}/>
    </Routes>
  </section>
  )
}
export default Body