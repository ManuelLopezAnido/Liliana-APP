import styles from './header.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  const [isActive, setActive] = useState(false);
  const mobileMenu = (e) => {
    //e.preventDefault();
    setActive (!isActive);
  }
  return (
    <div className={styles.header}>
      <a href='https://www.liliana.com.ar/' className={styles.logo}> </a>
      <nav className={`${styles.menu} ${isActive? styles.active: ''}`}>
        <ul>
          <Link  to = '/pcp' onClick={mobileMenu} className={styles.textlink} >
            PCP
          </Link >
          <Link to = '/inyeccion' onClick={mobileMenu} className={styles.textlink}>
            INYECCION
          </Link>
          <Link to = '/abastecimiento' onClick={mobileMenu} className={styles.textlink}>
            ABASTECIMIENTO
          </Link>
          <Link to = '/deposito' onClick={mobileMenu} className={styles.textlink}>
            DEPOSITO
          </Link>
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