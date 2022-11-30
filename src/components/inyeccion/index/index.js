import styles from './inyeccionHome.module.css'
import { useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {userContextProvider, checkPermission} from '../../commonComponents/context/userContext';
const ArmadoHome = ()=>{
  const [user,]= useContext(userContextProvider)
  const navigate = useNavigate()
  const [editPermission, setEditPermission] = useState (false)
  useEffect(()=>{
    if (! checkPermission('inyeccion',user.permissions)){
      navigate('/notAuthorized')
    }
    setEditPermission (checkPermission('jefe inyeccion',user.permissions))
  },[user,navigate])

  return(
    <div>
      <div className={styles.App}>
        <div className={styles.title}>
          INYECCION
        </div>
        <div className={styles.pcpMenu}> 
          {/* <Link to = 'relevamiento'>
            <button>
              Relevamiento
            </button>
          </Link>
          <Link to = 'tablas'>
            <button>
              Tablas
            </button>
          </Link> */}
          <Link to = 'maquinas'>
            <button>
              Ordenes maquinas
            </button>
          </Link>
          <Link to = 'moldes'>
            <button>
              Ordenes moldes
            </button>
          </Link>
          <Link to = 'matriceria'>
            <button>
              Matricería
            </button>
          </Link>
        </div>
        <div 
          className={editPermission ? styles.closeSession : styles.hidden} 
          onClick={()=>navigate("actualizar")}
        >
          Agregar Déposito
        </div>
      </div>
    </div>
  )
}
export default ArmadoHome
