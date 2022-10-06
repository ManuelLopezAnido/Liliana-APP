import styles from './depositoHome.module.css'
import { useState , useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom'
import ModalOk from "../../commonComponents/modalOk/index";
import ModalError from "../../commonComponents/modal error";

const MatriceriaHome = ()=>{
  const[showModal,setShowModal] = useState(false)
  const[errorMsg, SetErrorMsg] = useState('')
  const [passOk, setPassOk] = useState(sessionStorage.getItem('InyeccionUser'))
  const [users, setUsers] = useState([{'user':'Mati'}])
  const navigate = useNavigate()
  console.log(users)
  useEffect(()=>{
    fetchingUsers()
    // eslint-disable-next-line
  },[])

  const fetchingUsers = () => {
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/deposito/users')
      .then((res)=>res.json())
      .then ((json)=>{
        setUsers(json)
      })
      .catch (err => console.log(err))
  }

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