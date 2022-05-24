import { useState } from "react"
import ModalOk from "../../common components/modal ok";
import ModalError from "../../common components/modal error";
import styles from "./inputAbastecimiento.module.css"
import piezas from "../../../data samples/piezas.json"

const InputAbastecimiento = ()=>{
  const [inputs, setInputs] = useState({});
  const[showModal,setShowModal]=useState(false)
  const[errorMsg, SetErrorMsg] =useState('')
  const [arrErrors, setArrErrors]= useState([])
  const abasUser = sessionStorage.getItem('AbastecimientoUser')
  console.log ('Inputs: ',inputs)
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'codigo' || name === 'estanteria') {
      value=e.target.value.toUpperCase()
    }
    if (name ==='cantidad' || name ==='posicion' || name ==='altura'){
      value = parseInt(e.target.value)
    }
    setInputs (({...inputs, [name]: value}))
  }
  const handleCheckData = () => {
    let arr = []
    const codigoPz = inputs?.codigo || ""
    console.log(codigoPz)
    const pzOk = piezas.find(pz => pz.Articulo===(codigoPz))?.Detalle
    console.log('pz ok',pzOk)
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
    return arr
  }
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
    const date = (today.getDate() + "/" + (today.getMonth() + 1) + ":" + today.getFullYear());
    inputs.time = time
    inputs.date = date
    inputs.operario = abasUser
    setInputs ({...inputs}) 
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs)
    };
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/abastecimiento/upload',options)
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
        const fetchedInputs = {}
        if (inputs.radio === 'down'){
          if (json.cantidad){
            fetchedInputs.cantidad = json.cantidad
          } else {
            fetchedInputs.cantidad = inputs.cantidad    
          }
          fetchedInputs.codigo = inputs.codigo
        }
        if (inputs.radio === 'add'){
          fetchedInputs.estanteria = inputs.estanteria
          fetchedInputs.posicion = inputs.posicion
          fetchedInputs.altura = inputs.altura
        }
        setInputs({...fetchedInputs})
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
            value={abasUser}  
            onChange={handleChange} 
            placeholder="Operario"/>
        </label>
        <label>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Codigo de pieza')  ? styles.visible:''}`}>
            Codigo de pieza no válido
          </div>
          <input
            required = {!(inputs.radio === 'clean')}
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
            required = {(inputs.radio === 'add' || inputs.radio === 'replace')}
            onFocus={clearErrMsg}
            type='number'
            name='cantidad' 
            value={inputs.cantidad || ''} 
            onChange={handleChange} 
            placeholder="Cantidad"/>
        </label>
        <label>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Cantidad')  ? styles.visible:''}`}>
            Ingreso no válido:
          </div>
          <textarea
            className={styles.textarea} 
            onFocus={clearErrMsg}
            type='text'
            name='comentarios' 
            value={inputs.comentarios || ''} 
            onChange={handleChange} 
            placeholder="Comentarios"/>
        </label>
        <div className={styles.radioBox}>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'add'} 
              checked = {inputs.radio==='add'?true:false}
              onChange={handleChange}
              />
            <div>Suma</div>
          </label>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'replace'} 
              checked = {inputs.radio==='replace'?true:false}
              onChange={handleChange}
              />
            <div>Pisa</div>
          </label>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'down'} 
              checked = {inputs.radio==='down' ? true : false}
              onChange={handleChange}
              />
            <div>Baja</div>
          </label>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'clean'} 
              checked = {inputs.radio==='clean' ? true : false}
              onChange={handleChange}
              />
            <div>Limpia</div>
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
