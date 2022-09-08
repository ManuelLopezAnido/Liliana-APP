import { useEffect, useState } from "react"
import ModalOk from "../../commonComponents/modalOK/index.js";
import ModalError from "../../commonComponents/modal error";
import styles from "./inputAbastecimiento.module.css"

const InputAbastecimiento = ()=>{
  const [inputs, setInputs] = useState({});
  const[showModal,setShowModal]=useState(false)
  const[errorMsg, SetErrorMsg] =useState('')
  const [arrErrors, setArrErrors]= useState([])
  const [piezas, setPiezas] = useState([])
  const [to, setTo] = useState({to:false})
  const abasUser = sessionStorage.getItem('AbastecimientoUser')
  //console.log ('Inputs: ',inputs)
  useEffect (()=>{
    fetchingPiezas()
  },[])

  const fetchingPiezas = ()=>{
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/abastecimiento/piezas')
      .then((res)=>res.json())
      .then ((json)=>{
        setPiezas(json)
      })
      .catch (err => console.log(err))
  }
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'codigo' || name === 'estanteria' || name === 'altura'|| name === 'estanteriaTo' || name === 'alturaTo') {
      value=e.target.value.toUpperCase()
    }
    if (name ==='cantidad' || name ==='posicion' || name ==='posicionTo'){
      value = parseInt(e.target.value)
    }
    if (name === 'radio'){
      if (value === 'move'){
        setTo({to:true})
      } else {
        setTo({to:false})
      }
    }
    setInputs (({...inputs, [name]: value}))
  }
  const handleCheckData = () => {
    let arr = []
    const codigoPz = inputs?.codigo || ""
    const pzOk = piezas.find(pz => pz.articulo===(codigoPz))?.detalle
    if (!pzOk) {
      arr.push('Codigo de pieza')
    }
    const estanteria = inputs?.estanteria
    const rgexEstanteria = /^[A-TV-Z]{1}$|^A[A-B]$/
    if (!rgexEstanteria.test(estanteria)) {
      arr.push('Estanteria')
    }
    const posicion = inputs?.posicion
    if (posicion<1 || posicion>53 ) {
      arr.push('Posicion')
    }
    const altura = inputs?.altura
    const rgexAltura = /^[1-4A-D]{1,2}$/
    if (!rgexAltura.test(altura)) {
      arr.push('Altura')
    }
    const estanteriaTo = inputs?.estanteriaTo
    const rgexEstanteriaTo = /^[A-TV-Z]{1}$|^A[A-B]$/
    if (!rgexEstanteriaTo.test(estanteriaTo) && estanteriaTo === '') {
      arr.push('EstanteriaTo')
    }
    const posicionTo = inputs?.posicionTo
    if (posicionTo<1 || posicionTo>53 ) {
      arr.push('PosicionTo')
    }
    const alturaTo = inputs?.alturaTo
    const rgexAlturaTo = /^[1-4A-D]{1,2}$/
    if (!rgexAlturaTo.test(alturaTo)  && estanteriaTo === '') {
      arr.push('AlturaTo')
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
    const date = (today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear());
    inputs.time = time
    inputs.date = date
    inputs.operario = abasUser
    if (to.to){ //move section
      inputs.radio ='down'
    }
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
        console.log(json)
        if (to.to){ //move section
          fetchAdd()
          return
        }
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
  const fetchAdd = ()=>{
    console.log('Intro Move')
    inputs.radio ='add'
    inputs.estanteria = inputs.estanteriaTo
    inputs.posicion = inputs.posicionTo
    inputs.altura = inputs.alturaTo
    to.to=false
    setTo({...to})
    setInputs ({...inputs})
    handleSubmit({preventDefault: function (){}})
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
            onWheelCapture={(e)=>e.target.blur()}
            name='posicion' 
            value={inputs.posicion || ''} 
            onChange={handleChange} 
            placeholder="Posición"/>
        </label>
        <label>
          <div className={`${styles.notValid} ${['W','Y','V','X','Z'].indexOf(inputs.estanteria) + 1  ? styles.visible:''}`}>
            Ingresar altura y profunidad
          </div>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Altura')  ? styles.visible:''}`}>
            Ingreso no válido:
          </div>
          <input
            required
            onFocus={clearErrMsg}
            type={(['V','W','X','Y','Z'].indexOf(inputs?.estanteria) + 1 ) ? 'text' : 'number'}
            name='altura' 
            onWheelCapture={(e)=>e.target.blur()}
            value={inputs.altura || ''} 
            onChange={handleChange} 
            placeholder="Altura"/>
        </label>
        <label>
          <div className={`${styles.notValid}  ${arrErrors.find(e=>e === 'Cantidad') ? styles.visible:''}`}>
            Ingreso no válido:
          </div>
          <input 
            required = {(inputs.radio === 'add' || inputs.radio === 'replace')}
            onFocus={clearErrMsg}
            type='number'
            onWheelCapture={(e)=>e.target.blur()}
            name='cantidad' 
            value={inputs.cantidad || ''} 
            onChange={handleChange} 
            placeholder="Cantidad"/>
        </label>
        <label>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Comentarios')  ? styles.visible:''}`}>
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
            <div>Agregar</div>
          </label>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'replace'} 
              checked = {inputs.radio==='replace'?true:false}
              onChange={handleChange}
              />
            <div>Reemplazar</div>
          </label>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'down'} 
              checked = {inputs.radio==='down' ? true : false}
              onChange={handleChange}
              />
            <div>Bajar</div>
          </label>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'clean'} 
              checked = {inputs.radio==='clean' ? true : false}
              onChange={handleChange}
              />
            <div>Vaciar</div>
          </label>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'move'} 
              checked = {inputs.radio==='move' ? true : false}
              onChange={handleChange}
              />
            <div>Mover</div>
          </label>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'cleanRack'} 
              checked = {inputs.radio==='cleanRack' ? true : false}
              onChange={handleChange}
              />
            <div>Vaciar Estanteria</div>
          </label>
        </div>
{/* ------------ */}
        <div hidden={!to.to}>
          <label>
            <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'EstanteriaTo')  ? styles.visible:''}`}>
              Ingreso no válido:
            </div>
            <input 
              required = {inputs.radio === 'move' ? true : false }
              onFocus={clearErrMsg}
              type="text" 
              name='estanteriaTo' 
              value={inputs.estanteriaTo || ''}  
              onChange={handleChange} 
              placeholder="Estantería"/>
          </label>
          <label>
            <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'PosicionTo')  ? styles.visible:''}`}>
              Ingreso no válido:
            </div>
            <input
              required = {inputs.radio === 'move' ? true : false}
              onFocus={clearErrMsg}
              type="number"
              onWheelCapture={(e)=>e.target.blur()}
              name='posicionTo' 
              value={inputs.posicionTo || ''} 
              onChange={handleChange} 
              placeholder="Posición"/>
          </label>
          <label>
            <div className={`${styles.notValid} ${['W','Y','V','X','Z'].indexOf(inputs.estanteriaTo) + 1  ? styles.visible:''}`}>
              Ingresar altura y profunidad
            </div>
            <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'AlturaTo')  ? styles.visible:''}`}>
              Ingreso no válido:
            </div>
            <input
              required = {inputs.radio === 'move' ? true : false}
              onFocus={clearErrMsg}
              type={(['V','W','X','Y','Z'].indexOf(inputs?.estanteriaTo) + 1 ) ? 'text' : 'number'}
              name='alturaTo' 
              onWheelCapture={(e)=>e.target.blur()}
              value={inputs.alturaTo || ''} 
              onChange={handleChange} 
              placeholder="Altura"/>
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
