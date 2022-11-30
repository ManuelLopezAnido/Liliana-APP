import styles from './abastecimientoHome.module.css'
import { useEffect, useContext, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom'
import {userContextProvider, checkPermission } from '../../commonComponents/context/userContext';

const AbastecimientoHome = ()=>{
  const [user,]= useContext(userContextProvider)
  const navigate = useNavigate()
  const [editPermission, setEditPermission] = useState (false)
  useEffect(()=>{
    if (! checkPermission('abastecimiento',user.permissions)){
      navigate('/notAuthorized')
    }
    setEditPermission (checkPermission('jefe abastecimiento',user.permissions))
  },[user,navigate])

  return(
    <div>
      <div className={styles.App}>
        <div className={styles.title}>
          ABASTECIMIENTO
        </div>
        <div className={styles.pcpMenu}> 
          <Link to = 'tablas'>
            <button>
              Tablas
            </button>
          </Link>
          <Link to = 'relevamiento'>
            <button>
              Relevamiento
            </button>
          </Link>
          <Link to = 'criticos'>
            <button>
              Criticos
            </button>
          </Link>
          <Link to = 'historial'>
            <button>
              Historial
            </button>
          </Link>
        </div>
        <div 
            className={editPermission ? styles.closeSession : styles.hidden} 
            onClick={()=> navigate('actualizar')}
          >
            Agregar Abastecimiento
          </div>
      </div>
    </div>
  )
}
export default AbastecimientoHome
