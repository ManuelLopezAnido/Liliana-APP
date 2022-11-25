import styles from './layout.module.css'
import UserContextComponent from '../../commonComponents/context/userContext';
import Header from '../header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
  <>
    <UserContextComponent >
      <Header/>
      <section className={styles.body}>
        <Outlet/>
      </section>
    </UserContextComponent>
  </>
  )
}
export default Layout 