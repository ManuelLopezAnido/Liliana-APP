import styles from './header.module.css'
import { useState } from 'react';

const Header = () => {
  const [isActive, setActive] = useState(false);
  const mobileMenu = (e) => {
    e.preventDefault();
    setActive (!isActive);
  }
  return (
    <div className={styles.header}>
      <a href='https://www.liliana.com.ar/' className={styles.logo}> </a>
      <nav className={`${styles.menu} ${isActive? styles.active: ''}`}>
        <ul>
          <li>
            CARGA PRODUCCION
          </li>
          <li>
            DEPOSITO
          </li>
          <li>
            MACROS
          </li>
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