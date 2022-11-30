import styles from './depositoHome.module.css'
import { useContext , useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom'
import { checkPermission, userContextProvider } from '../../commonComponents/context/userContext';

const DepositoHome = ()=>{
  const [user,]= useContext(userContextProvider)
  const navigate = useNavigate()
  const [editPermission, setEditPermission] = useState (false)
  useEffect(()=>{
    if (! checkPermission('deposito',user.permissions)){
      navigate('/notAuthorized')
    }
    setEditPermission (checkPermission('jefe deposito',user.permissions))
  },[user,navigate])
  return(
    <div>
      <div className={styles.App}>
        <div className={styles.title}>
          DEPÓSITO
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
export default DepositoHome