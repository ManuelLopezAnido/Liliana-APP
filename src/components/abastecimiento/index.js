import { useState } from "react"
import ModalOk from "../common components/modal ok";
import ModalError from "../common components/modal error";
import styles from "./inputAbastecimiento.module.css"
import piezas from "../../data samples/piezas.json"

const InputAbastecimiento = ()=>{
  const [inputs, setInputs] = useState({});
  const[showModal,setShowModal]=useState(false)
  const[errorMsg, SetErrorMsg] =useState('')
  const [arrErrors, setArrErrors]= useState([])
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs (({...inputs, [name]: value}))
  }
  const handleCheckData = () => {
    let arr = []
    const codigoPz = inputs?.codigo
    const pzOk = piezas.find(pz =>pz.Articulo===('ZZ'+codigoPz))?.Articulo
    console.log('pzOk',pzOk)
    if (!pzOk) {
      arr.push('Codigo de pieza')
    }
    const estanteria = inputs?.estanteria
    const rgexEstanteria = /^[A-TV-Z]{1}$/
    if (!rgexEstanteria.test(estanteria)) {
      arr.push('Estanteria')
    }
    const posicion = inputs?.posicion
    
    if (posicion<1 || posicion>53 ) {
      arr.push('Posicion')
    }
    const altura = inputs?.altura
    const rgexAltura = /^[1-4]{1}$/
    if (!rgexAltura.test(altura)) {
      arr.push('Altura')
    }
    const cantidad = inputs?.cantidad
    if (cantidad<0) {
      arr.push('Cantidad')
    }
    console.log('arr after chek: ',arr)
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
    setInputs ({...inputs}) 
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs)
    };
    fetch('http://192.168.11.139:4000/abastecimiento',options)
      .then(res=>{
        console.log('Respuetsa del servidor',res.ok)
        if(res.ok){
         openModal()
        }else{
          throw res ;
        }
      }).then(
        setInputs({})
      )
      .catch(res => {
        console.log('error es: ',res.statusText)
        SetErrorMsg(res.statusText)
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
          <h1>Abastecimiento</h1>
        </div>
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
            placeholder="Codigo de insumo"/>
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
            required
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
            required
            onFocus={clearErrMsg}
            type="number" 
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
export default InputAbastecimiento
