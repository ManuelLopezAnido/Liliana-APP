import styles from './abastecimientoHome.module.css'
import { useState , useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom'
import ModalOk from "../../commonComponents/modal ok/index.js";
import ModalError from "../../commonComponents/modal error";

const AbastecimientoHome = ()=>{
  const [inputs, setInputs] = useState({});
  const [showModal,setShowModal] = useState(false)
  const [errorMsg, SetErrorMsg] = useState('')
  const [passOk, setPassOk] = useState(sessionStorage.getItem('AbastecimientoUser'))
  const [users, setUsers] = useState ([])
  const navigate = useNavigate();
  
  useEffect (()=>{
    fetchingUsers()
  },[])

  const fetchingUsers = () => {
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/abastecimiento/users')
      .then((res)=>res.json())
      .then ((json)=>{
        setUsers(json)
      })
      .catch (err => console.log(err))
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs (({...inputs, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputs ({...inputs})
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs)
    };
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/abastecimiento/login',options)
      .then(res=>{
        console.log('Respuetsa del servidor',res.ok)
        if(res.ok){
         return(res)
        }else{
          throw(res)
        }
      })
      .then(res=>res.json())
      .then((json)=>{
        sessionStorage.setItem("AbastecimientoUser",json.user)
        openModal()
        setPassOk(json.user)
        setInputs({})
      })
      .catch(res => {
        try{
          res.json()
          .then(json=>{
            console.log(json)
            SetErrorMsg(json.message)
          })
        } 
        catch {
          SetErrorMsg('Error de conexion')
        }
      })    
    }
  const closeModal=()=>{
    SetErrorMsg('')
    setShowModal(false)
  }
  const openModal=()=>{
    setShowModal(true)
  }
  const closeSession=()=>{
    sessionStorage.setItem('AbastecimientoUser','')
    setPassOk(false)
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
          ABASTECIMIENTO
        </div>
        <form className={passOk ? styles.hidden : styles.armadoForm} autoComplete="off" onSubmit={handleSubmit}>
          <label >
            <select 
            className={`${styles.select} ${!inputs.lider ? styles.placeholder : ''}`}
            required
            type="text" 
            name='lider' 
            value={inputs.lider || ''}  
            onChange={handleChange} 
            >
              <option disabled value = "" hidden> Operario </option>
              {users.map(user=>{
                return(
                  <option key={user.user}>
                    {user.user}
                  </option>
                )
              })}
              </select>
          </label>
          <label>
            <input 
                className={styles.inputs}
                required
                pattern={'[0-9]{4}'}
                title={'Contraseña de 4 numeros'}
                type="password" 
                autoComplete="on"
                name='contraseña' 
                value={inputs.contraseña || ''}  
                onChange={handleChange} 
                placeholder="Contraseña"/>
          </label>
          <button type="submit" className={styles.button}>Ingresar</button>
        </form>
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
export default AbastecimientoHome
