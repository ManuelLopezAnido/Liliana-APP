import { useState } from "react"
import ModalOk from "../../common components/modal ok";
import ModalError from "../../common components/modal error";
import styles from "./inputsDeposito.module.css"
import piezas from "../../../data samples/piezas.json"

const InputDeposito = ()=>{
  const [inputs, setInputs] = useState({});
  const[showModal,setShowModal]=useState(false)
  const[errorMsg, SetErrorMsg] =useState('')
  const [arrErrors, setArrErrors]= useState([])
  const depositoUser = sessionStorage.getItem('DepositoUser')
  console.log (inputs)
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'codigo' || name === 'estanteria') {
      value=e.target.value.toUpperCase()
    }
    setInputs (({...inputs, [name]: value}))
  }
  const handleCheckData = () => {
    let arr = []
    const codigoPz = inputs?.codigo
    const pzOk = piezas.find(pz =>pz.Articulo===(codigoPz))?.Articulo
    if (!pzOk) {
      arr.push('Codigo de pieza')
    }
    const estanteria = inputs?.estanteria
    const rgexEstanteria = /^[A-EG-H]{1}$/
    if (!rgexEstanteria.test(estanteria)) {
      arr.push('Estanteria')
    }
    
    const posicion = inputs?.posicion
    if (posicion<1 || posicion>38) {
      arr.push('Posicion')
    }
    
    const altura = inputs?.altura || ''
    const rgexAltura = /^$|^[1-5\s]{1}$/
    if (!rgexAltura.test(altura)) {
      arr.push('Altura')
    }

    const cantidad = parseInt(inputs?.cantidad)
    if (cantidad<1) {
      arr.push('Cantidad')
    }
    return arr
  }
  console.log ('arrErrors: ', arrErrors)
  const clearErrMsg = () =>{
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
    inputs.time = time
    const date = (today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear());
    inputs.date = date
    inputs.cantidad = parseInt(inputs.cantidad)
    if (inputs.radio === "Baja") {
      inputs.cantidad = inputs.cantidad * -1
    }
    inputs['operario']=depositoUser
    setInputs ({...inputs}) 
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs)
    };
    fetch('http://192.168.11.139:4000/api/deposito/upload',options)
      .then((res)=>{
        console.log('Respuetsa del servidor',res.ok)
        if(!res.ok){
          throw (res)
        }
        openModal()
        return(res.json())
      })
      .then((json)=>{
        console.log('SEGUNDO THEN')
        console.log(json)
        setInputs({})
      })
      .catch(res => {
        console.log('res = ',res)
        res.json()
        .then(json=>{
          console.log(json)
          console.log('error es: ',res.statusText)
          SetErrorMsg(json.message)
        })
        .catch(SetErrorMsg(res.statusText))
      })
    }
  const closeModal=()=>{
    SetErrorMsg('')
    setShowModal(false)
  }
  const openModal=()=>{
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
          <h1>Depósito Abastecimiento</h1>
        </div>
        <label>
            <input
            disabled
            onFocus={clearErrMsg}
            type="text" 
            name="operario"
            value={depositoUser}  
            onChange={handleChange} 
            placeholder="Operario"/>
        </label>
        <label>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Codigo de pieza')  ? styles.visible:''}`}>
            Codigo de pieza no válido
          </div>
          <input
            required
            onFocus={clearErrMsg}
            type="text" 
            name="codigo"
            value={inputs.codigo || ''}  
            onChange={handleChange} 
            placeholder="Codigo de pieza"/>
        </label>
        <label>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Estanteria')  ? styles.visible:''}`}>
            Ingreso no válido:
          </div>
          <input 
            required
            onFocus={clearErrMsg}
            type="text" 
            name='estanteria' 
            value={inputs.estanteria || ''}  
            onChange={handleChange} 
            placeholder="Estantería"/>
        </label>
        <label>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Posicion')  ? styles.visible:''}`}>
            Ingreso no válido:
          </div>
          <input
            required
            onFocus={clearErrMsg}
            type="number"
            name='posicion' 
            value={inputs.posicion || ''} 
            onChange={handleChange} 
            placeholder="Posición"/>
        </label>
        <label>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Altura')  ? styles.visible:''}`}>
            Ingreso no válido:
          </div>
          <input
            hidden = {!/^[A-D]{1}$/.test(inputs.estanteria)}
            required = {/^[A-D]{1}$/.test(inputs.estanteria)}
            onFocus={clearErrMsg}
            type="number" 
            name='altura' 
            value={inputs.altura || ''} 
            onChange={handleChange} 
            placeholder="Altura"/>
        </label>
        <label>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Cantidad')  ? styles.visible:''}`}>
            Ingreso no válido:
          </div>
          <input 
            onFocus={clearErrMsg}
            type='number'
            name='cantidad' 
            value={inputs.cantidad || ''} 
            onChange={handleChange} 
            placeholder="Cantidad"/>
        </label>
        <div className={styles.radioBox}>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'Alta'} 
              checked = {inputs.radio==='Alta'?true:false}
              onChange={handleChange}
              />
            <div>Alta</div>
          </label>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'Baja'} 
              checked = {inputs.radio==='Baja'?true:false}
              onChange={handleChange}
              />
            <div>Baja</div>
          </label>
        </div>
        <button 
          className = {inputs.radio ? '' : styles.buttonDisable } 
          disabled={inputs.radio ? false : true }  
          type="submit">
            Cargar
        </button>
      </form>
    </div> 
    </>
  )
}
export default InputDeposito
