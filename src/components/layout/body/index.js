import styles from './body.module.css'
import PcpRoutes from '../../routes/pcpRoutes.js'
import InyeccionRoutes from '../../routes/inyeccionRoutes.js'
import DepositoRoutes from '../../routes/depositoRoutes.js'
import {Routes,Route, Navigate } from 'react-router-dom'

const Body = () => {
  return (
  <section className={styles.content}>
    <Routes>
      <Route path='/pcp/*' element = {<PcpRoutes/>}/>
      <Route path='/inyeccion' element = {<InyeccionRoutes/>}/>
      <Route path='/deposito' element = {<DepositoRoutes/>}/>
      <Route path="*" element={<Navigate replace to="/pcp" />}/>
    </Routes>
  </section>
  )
}
export default Body