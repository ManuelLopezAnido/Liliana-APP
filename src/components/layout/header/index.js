import styles from './header.module.css'
import { useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import {userContextProvider} from '../../commonComponents/context/userContext';

const Header = () => {
  const [isActive, setActive] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true)
  const [logged, setLogged] = useState(false)
  const [userContext,]= useContext(userContextProvider)
  const [pathname, ] = useState(window.location.pathname.slice(0,7))
  console.log('Header: ',userContext)
  console.log(pathname)
  useEffect (()=>{
    if (pathname === '/armado') {
      setHeaderVisible(false)
    }
    userContext ? setLogged(true) : setLogged(false) 
  },[userContext,pathname])
  
  const mobileMenu = (e) => {
    //e.preventDefault();
    setActive (!isActive);
  }
  return (
    <div className = {headerVisible ?  styles.header : styles.headerNoVisible} >
      <a href='https://www.liliana.com.ar/' className={styles.logo}> </a>
      <nav className={`${styles.menu} ${isActive? styles.active: ''}`}>
        <ul>
          <Link to = '/login' onClick={mobileMenu} className={styles.textlink} >
            HOME
          </Link> 
          <Link to = '/armado' onClick={mobileMenu} className={logged ? styles.textlink : styles.headerNoVisible} >
            ARMADO
          </Link >
          <Link to = '/inyeccion' onClick={mobileMenu} className={logged ? styles.textlink : styles.headerNoVisible}>
            INYECCION
          </Link>
          <Link to = '/abastecimiento' onClick={mobileMenu} className={logged ? styles.textlink : styles.headerNoVisible}>
            ABASTECIMIENTO
          </Link>
          <Link to = '/deposito' onClick={mobileMenu} className={logged ? styles.textlink : styles.headerNoVisible}>
            DEPOSITO
          </Link>
          <Link to = '/procesos' onClick={mobileMenu} className={logged ? styles.textlink : styles.headerNoVisible} >
            PROCESOS
          </Link >
        </ul>
      </nav>
      <div className= {`${styles.hamburger} ${isActive? styles.active: ''}`} onClick= {mobileMenu}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </div>
  )
}
export default Header