import styles from './inyeccionHome.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import ModalOk from "../../common components/modal ok";
import ModalError from "../../common components/modal error";

const InyeccionHome = ()=>{
  const [inputs, setInputs] = useState({});
  const[showModal,setShowModal]=useState(false)
  const[errorMsg, SetErrorMsg] =useState('')
  const [passOk, setPassOk]=useState(sessionStorage.getItem('InyeccionUser'))

  const usersInye = []

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
        console.log('respuesta de armdo:',json)
        sessionStorage.setItem("InyeccionUser",json.user)
        openModal()
        setPassOk(json.user)
        setInputs({})
      })
      .catch(res => {
        try {
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
    sessionStorage.setItem('InyeccionUser','')
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
              <option disabled value="" hidden> Operario </option>"
              {usersInye.map(user=>{
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
                title={'Contrase??a de 4 numeros'}
                type="password" 
                autoComplete="on"
                name='contrase??a' 
                value={inputs.contrase??a || ''}  
                onChange={handleChange} 
                placeholder="Contrase??a"/>
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
        </div>
        <div className={passOk ? styles.closeSession : styles.hidden} onClick={closeSession}>
          Cerrar sesi??n
        </div>
      </div>
    </div>
  )
}
export default InyeccionHome
