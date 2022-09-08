import { useState } from "react"
import ModalOk from "../../commonComponents/modalOK";
import ModalError from "../../commonComponents/modal error";
import styles from "./actualizarAbastecimiento.module.css"

const ActualizarAbastecimiento = ()=>{
  const [inputs, setInputs] = useState({});
  const[showModal,setShowModal]=useState(false)
  const[errorMsg, SetErrorMsg] =useState('')
  const [arrErrors, setArrErrors]= useState([])
  
  const abasUser = sessionStorage.getItem('AbastecimientoUser')
  const uri = window.location.pathname.substring(1)
  const area = uri.substring(0,uri.indexOf('/'))
  
  console.log ('Inputs: ', inputs)

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'codigo' || name === 'detalle' || name === 'familia' || name === 'nombreOpe' ) {
      value=e.target.value.toUpperCase()
    }
    if (name === 'cantxPallet' ){
      value = parseInt(e.target.value)
    }
    if (name === 'tipo'){
      setInputs ({[name]: value})
      return
    }
    setInputs ({...inputs, [name]: value})
  }
  const handleCheckData = () => {
    let arr = []
    const codigoPz = inputs?.codigo || ""
    if (codigoPz.length !== 6 && codigoPz.length !== 0 && codigoPz.length !== 7){
      arr.push('codigo')
    }
   
    const cantidad = inputs?.cantidad
    if (cantidad<0) {
      arr.push('cantxPallet')
    }

    const stockM = inputs?.stockM
    if (stockM<0) {
      arr.push('stockM')
    }
    return arr
  }
   const clearErrMsg = () => {
    setArrErrors([])
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const arr =handleCheckData()
    console.log ('resultado del arr', arr)
    setArrErrors(arr)
    if (arr.length !== 0){
      console.log('exit')
      return
    } 
    const today = new Date();
    const time = (today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
    const date = (today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear());
    inputs.time = time
    inputs.date = date
    inputs.operario = abasUser
    setInputs ({...inputs}) 
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs)
    };
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/' + area + '/actualizar/'+ inputs.tipo, options)
      .then((res)=>{
        if(!res.ok){
          throw (res)
        }
        return(res.json())
      })
      .then((json)=>{
        openModal(json) // not necessary to pass something
      })
      .catch(res => {
        console.log('res = ',res)
        try {
          res.json()
            .then(json=>{
              console.log('JSON',json)
              SetErrorMsg(json.message)
            })
            .catch(SetErrorMsg('Error en el servidor'))
        } 
        catch {
          SetErrorMsg('Falla de conexión')
        }
      })    
  }
  const closeModal= () => {
    SetErrorMsg('')
    setShowModal(false)
  }
  const openModal= () => {
    setShowModal(true)
  }
  return(
    <>
      <div className= {styles.deposit}>
      <ModalOk
        close={closeModal}
        show={showModal}
      />
      <ModalError
        close={closeModal}
        errorMsg={errorMsg}
      />
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.depositForm} >
        <div className={styles.segment}>
          <h1>Actualizar Piezas</h1>
        </div>
        <label>
            <select
            className={`${styles.select} ${!inputs.lider ? styles.placeholder : ''}`}
            type="text" 
            name="tipo" 
            placeholder="Código"
            value={inputs.tipo || ''}
            onChange={handleChange}>
              <option disabled value= "" hidden> Tipo </option>
              <option value = 'pieza'>
                NUEVA PIEZA
              </option>
              <option value = 'operario'>
                NUEVO OPERARIO
              </option>
          </select>
        </label>
        <label className = {inputs.tipo === 'pieza' ? styles.visible : styles.hidden }>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'codigo')  ? styles.visible:''}`}>
            Ingreso no válido:
          </div>
          <input 
            required = {inputs.tipo === 'pieza' ? true : false}
            onFocus={clearErrMsg}
            type="text" 
            name='codigo' 
            value={inputs.codigo || ''}  
            onChange={handleChange} 
            placeholder="Código"
          />
        </label>
        <label
        className = {inputs.tipo === 'pieza' ? styles.visible : styles.hidden }
        >
          <input
            required = {inputs.tipo === 'pieza' ? true : false}
            onFocus={clearErrMsg}
            type="text"
            name='detalle' 
            value={inputs.detalle || ''} 
            onChange={handleChange} 
            placeholder="Detalle"/>
        </label>
        <label
        className = {inputs.tipo === 'pieza' ? styles.visible : styles.hidden }
        >
          <input
            onFocus={clearErrMsg}
            type={'text'}
            name='familia' 
            value={inputs.familia || ''} 
            onChange={handleChange} 
            placeholder="Familia"/>
        </label>
        <label
        className = {inputs.tipo === 'pieza' ? styles.visible : styles.hidden }
        >
          <div className={`${styles.notValid}  ${arrErrors.find(e=>e === 'cantxPallet') ? styles.visible:''}`}>
            Ingreso no válido:
          </div>
          <input 
            onFocus={clearErrMsg}
            type='text' 
            inputMode='numeric' 
            name='cantxPallet'
            value={inputs.cantxPallet || ''} 
            onChange={handleChange} 
            placeholder="Cantidad por pallets"/>
        </label>
        <label
        className = {inputs.tipo === 'pieza' ? styles.visible : styles.hidden }
        >
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'stockM')  ? styles.visible:''}`}>
            Ingreso no válido:
          </div>
          <input
            onFocus={clearErrMsg}
            type='text' 
            inputMode='numeric' 
            name='stockM' 
            value={inputs.stockM || ''} 
            onChange={handleChange} 
            placeholder="Stock minimo"/>
        </label>
        {/* ---- OPERARIO ----  */}
        <label
        className = {inputs.tipo === 'operario' ? styles.visible : styles.hidden }
        >
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'stockM')  ? styles.visible:''}`}>
            Ingreso no válido:
          </div>
          <input
            required = {inputs.tipo === 'operario' ? true : false}
            onFocus={clearErrMsg}
            type='text'
            name='nombreOpe' 
            value={inputs.nombreOpe || ''} 
            onChange={handleChange} 
            placeholder="Nombre"/>
        </label>
        <label
        className = {inputs.tipo === 'operario' ? styles.visible : styles.hidden }
        >
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'stockM')  ? styles.visible:''}`}>
            Ingreso no válido:
          </div>
          <select
            required = {inputs.tipo === 'operario' ? true : false}
            className={`${styles.select} ${!inputs.lider ? styles.placeholder : ''}`}
            type='text'
            name='turno' 
            value={inputs.turno || ''} 
            onChange={handleChange} 
            placeholder="Turno">
              <option disabled value = "" hidden >
                Turno
              </option>
              <option>
                Mañana
              </option>
              <option>
                Tarde
              </option>
              <option>
                Noche
              </option>
            </select>
        </label>
        <button 
          className = {inputs.codigo || inputs.nombreOpe ? '' : styles.buttonDisable } 
          disabled={inputs.codigo || inputs.nombreOpe|| inputs.nombreOpe ? false : true }  
          type="submit">
            Cargar
        </button>
      </form>
    </div> 
    </>
  )
}
export default ActualizarAbastecimiento
