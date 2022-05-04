import styles from './armadoHome.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import ModalOk from "../../common components/modal ok";
import ModalError from "../../common components/modal error";

const ArmadoHome = ()=>{
  const [inputs, setInputs] = useState({});
  const[showModal,setShowModal]=useState(false)
  const[errorMsg, SetErrorMsg] =useState('')
  const [passOk, setPassOk]=useState(sessionStorage.getItem('LiderUser'))

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
    fetch('http://192.168.11.139'+ process.env.serverPORT +'/api/armado/login',options)
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
        sessionStorage.setItem("LiderUser",json.user)
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
          ARMADO
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
              <optgroup label="Armado 1"/>
              <option>AUYEROS, CRISTIAN LEONARDO</option>
              <option>BATTISTELLI, MARCOS</option>
              <option>CABRERA, MARIANO</option>
              <option>DELGADO, RICARDO</option>
              <option>GAMARRA, JONATAN</option>
              <option>MEDINA BENITEZ, JOSE</option>
              <option>MONZON, AYELEN MARIBEL</option>
              <option>ARGAÑARAS, LEANDRO RODRIGO</option>
              <option>ROBLEDO, PATRICIO</option>
              <option>SARMIENTO, BRIAN EZEQUIEL</option>
              <option>GONZALEZ, WALTER DAVID </option>
              <optgroup label="Armado 2"/>
              <option>ARGAÑARAS, LEANDRO RODRIGO</option>
              <option>ROBLEDO, PATRICIO</option>
              <option>SAUCEDO, NESTOR</option>
              <option>SCHOENFELD, LUCIANO ADRIAN</option>
              <option>SEGOVIA, ARIEL</option>
              <option>SAUCEDO, HUGO HECTOR</option>
              <option>SARMIENTO, BRIAN EZEQUIEL</option>
              <option>MONZON, AYELEN MARIBEL</option>
              <option>GAMARRA, JONATAN</option>
              <optgroup label="Armado 3"/>
              <option>CORREA, OSCAR NICOLAS</option>
              <option>GOMEZ, ISAIAS MAXIMILIANO</option>
              <option>LEZCANO, FABIAN GASTON</option>
              <option>CARDOZO, VICTOR EMANUEL</option>
              <option>PEDERNERA, LUIS OMAR</option>
              <optgroup label="Armado 4"/>
              <option>VICICH, FERNANDO MARTIN</option>
              <option>GARCIA, FEDERICO</option>
              <option>LEDESMA, CLAUDIO ANDRES</option>
              <option>JAUME, LUCAS DARIO</option>
              <option>MENDOZA, CARLOS FERNANDO</option>
              <option>ZALAZAR, JONATAN MATIAS</option>
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
          <a href = 'https://www.liliana.com.ar/internodos/administracion/Dp.php'>
            <button>
              Despiece
            </button>
          </a>
          <Link to = 'relevamiento'>
            <button>
              Relevamiento
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
