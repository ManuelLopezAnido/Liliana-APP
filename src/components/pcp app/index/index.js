import logo from './logo.svg';
import styles from './pcpApp.module.css';
import { Link } from 'react-router-dom';
function Procesos() {
  return (
    <div className={styles.App}>
      <header className={styles.Appheader}>
        <img src={logo} className={styles.Applogo} alt="logo" />
        <div className={styles.pcpMenu}> 
          <Link to = 'produccion'>
            <button>
              Produccion
            </button>
          </Link>
          <Link to = 'cambio-de-turno'> 
            <button>
                Cambios de Turno
            </button>
          </Link> 
          <Link to = 'macros'>
            <button>
                Macros
            </button>
          </Link>
        </div>
        <p>
           <code>In progress...</code> 
        </p>
        <a
          className={styles.Applink}
          href="https://www.instagram.com/manu.lopezanido/?hl=es-la"
          target="_blank" rel="noreferrer"
        >
          Created by Manu
        </a>
      </header>
    </div>
  );
}

export default Procesos;
