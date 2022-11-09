import styles from './layout.module.css'
import Header from '../header'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
  <>
    <Header/>
    <section className={styles.body}>
      <Outlet/>
    </section>
  </>
  )
}
export default Layout 