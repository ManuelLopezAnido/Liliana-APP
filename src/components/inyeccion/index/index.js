import styles from './inyeccionHome.module.css'
import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom'
import ModalOk from "../../commonComponents/modalOk/index";
import ModalError from "../../commonComponents/modal error";

const ArmadoHome = ()=>{
  const [inputs, setInputs] = useState({});
  const[showModal,setShowModal] = useState(false)
  const[errorMsg, SetErrorMsg] = useState('')
  const [passOk, setPassOk] = useState(sessionStorage.getItem('InyeccionUser'))
  const [users, setUsers] = useState([])

  useEffect(()=>{
    fetchingUsers()
  },[])
  
  const fetchingUsers = () => {
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/inyeccion/users')
      .then((res)=>res.json())
      .then ((json)=>{
        setUsers(json)
      })
      .catch (err => console.log(err))
  }
  console.log(users)

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
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/inyeccion/login',options)
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
        sessionStorage.setItem("InyeccionUser",json.user)
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
      }
    )    
  }

  const closeModal=()=>{
    SetErrorMsg('')
    setShowModal(false)
  }
  const openModal=()=>{
    setShowModal(true)
  }
  const closeSession=()=>{
    sessionStorage.setItem('LiderUser','')
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
          INYECCION
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
              <option disabled value="" hidden> Lider </option>"
              {
                ['Mañana','Tarde','Noche'].map((shifts)=>{
                return(
                  <Fragment key ={shifts}>
                    <optgroup label = {"Turno " + shifts} />
                    {
                      users.filter((user)=>(user.shift === shifts))
                      .map((user)=>{
                        return(<option key={user.user}>{user.user}</option>)
                      })
                    }
                  </Fragment>
                  )  
                })
              }
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
          <Link to = 'relevamiento'>
            <button>
              Relevamiento
            </button>
          </Link>
          <Link to = 'tablas'>
            <button>
              Tablas
            </button>
          </Link>
          <Link to = 'inyecotras'>
            <button>
              Reparación Inyecotoras
            </button>
          </Link>
          <Link to = 'moldes'>
            <button>
              Reparación Moldes
            </button>
          </Link>
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
        <div className={passOk ? styles.closeSession : styles.hidden} onClick={closeSession}>
          Cerrar sesión
        </div>
      </div>
    </div>
  )
}
export default ArmadoHome
