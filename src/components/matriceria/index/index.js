import styles from './depositoHome.module.css'
import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom'
import ModalOk from "../../commonComponents/modalOk/index";
import ModalError from "../../commonComponents/modal error";

const MatriceriaHome = ()=>{
  const[showModal,setShowModal] = useState(false)
  const[errorMsg, SetErrorMsg] = useState('')
  const [passOk, setPassOk] = useState(sessionStorage.getItem('InyeccionUser'))
  const navigate = useNavigate()

  const closeModal=()=>{
    SetErrorMsg('')
    setShowModal(false)
  }
  const closeSession=()=>{
    sessionStorage.setItem('InyeccionUser','')
    setPassOk(false)
    navigate('/inyeccion')
  }
  return(
    <div>
      <ModalOk
        close={closeModal}
        show={showModal}
        messege = {"Registro Exitoso"}
      />
      <ModalError
        close={closeModal}
        errorMsg={errorMsg}
      />
      <div className={styles.App}>
        <div className={styles.title}>
          MATRICERIA
        </div>
        <div className={passOk ? styles.pcpMenu : styles.hidden }> 
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
        <div className = {styles.foot}>
          <div className={
            passOk === 'GONZALEZ, LUCAS' || passOk === 'CABRERA, GERARDO SEBASTIAN' ? 
            styles.closeSession : styles.hidden} 
            onClick={() => navigate('actualizar')}
          >
            Actualizar
          </div>
          <div className={passOk ? styles.closeSession : styles.hidden} onClick={closeSession}>
            Cerrar sesión
          </div>
        </div>
      </div>
    </div>
  )
}
export default MatriceriaHome