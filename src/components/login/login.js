import styles from './login.module.css'
import { useState , useEffect, useContext } from 'react';
//import { useNavigate } from 'react-router-dom'
import ModalOk from "../commonComponents/modalOk/index";
import ModalError from "../commonComponents/modal error";
import {userContextProvider} from '../commonComponents/context/userContext';

const Login = ()=>{
  const [inputs, setInputs] = useState({});
  const[showModal,setShowModal] = useState(false)
  const[errorMsg, SetErrorMsg] = useState('')
  const [users, setUsers] = useState([{}])
  const [user, setUser] = useContext(userContextProvider)
  //const navigate = useNavigate()
  
  useEffect(()=>{
    fetchingUsers()
    console.log('login')
  },[])

  const fetchingUsers = () => {
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/home/users')
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
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs)
    };
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/home/login',options)
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
        sessionStorage.setItem('userData',JSON.stringify(json.userData))
        openModal(json)
        setUser(json.userData)
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
  const openModal=(json)=>{
    setShowModal(json)
  }
  const closeSession=()=>{
    sessionStorage.removeItem('userData')
    setUser("")
  }
  const totalAreas = () => {
    const areas = users.map(user=>{
      return( 
        user.area?.area
      )
    }).filter((a,index,arr)=>{
      return(
        arr.indexOf(a)===index
      )
    })
    return areas
  }

  return(
    <div>
      <ModalOk
        close={closeModal}
        show={showModal}
        messege = {showModal.message ? showModal.message  :"Registro Exitoso"}
      />
      <ModalError
        close={closeModal}
        errorMsg={errorMsg}
      />
      <div className={styles.App}>
        <div className={styles.title}>
          LILIANA APP
        </div>
        <form className={user ? styles.hidden : styles.armadoForm} autoComplete="off" onSubmit={handleSubmit}>
          <label >
              <select 
                className={`${styles.select} ${!inputs.lider ? styles.placeholder : ''}`}
                required
                type="text" 
                name="area"
                value={inputs.area || ''}  
                onChange={handleChange}
              >
                <option disabled value="" hidden> Area </option>
                {
                  totalAreas().map((area,index)=>{
                    return(
                      <option key={area + index}>
                        {area}
                      </option>
                    )
                  })
                }
              </select>
          </label>
          <label >
            <select 
              className={`${styles.select} ${!inputs.lider ? styles.placeholder : ''}`}
              required
              type="text" 
              name='id' 
              value={inputs.id || ''}  
              onChange={handleChange} 
            >
              <option disabled value="" hidden> Operario </option>"
              {users.map((user,index)=>{
                if (user.area?.area === inputs.area ){
                  return(
                    <option key={user.name + index} value={user._id}>
                      {user.lastname + ", " + user.name}
                    </option>
                  )
                }
                return null
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
                name='password' 
                value={inputs.password || ''}  
                onChange={handleChange} 
                placeholder="Contraseña"/>
          </label>
          <button type="submit" className={styles.button}>Ingresar</button>
        </form>
        <div className={user ? styles.pcpMenu : styles.hidden }> 
          <div className={`${styles.infobox}  ${styles.mdcard}`}>
			      <div className = {styles.mdcardcontent } >
				      <h2>Bienvenido</h2>
				      <span>{`${user?.name} ${user?.lastname}`}</span>
              <p className={styles.areaTitle}> Area: {user?.area?.area}</p>
              <p className={styles.permisosTitle}>PERMISOS:</p>
              {
                user?.permissions?.map((area)=>{
                  return(
                    <p key={area}>
                      {area.toUpperCase()}
                    </p>
                  )
                })
              }
			      </div>
          </div>
        </div>
        <div className = {styles.foot}>
          <div className={user ? styles.closeSession : styles.hidden} onClick={closeSession}>
            Cerrar sesión
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login