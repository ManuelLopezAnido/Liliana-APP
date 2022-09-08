import styles from './inputsarmado.module.css'
import { useEffect, useState } from "react"
import ModalOk from "../../common components/modal ok/index.js";
import ModalError from "../../common components/modal error";

const InputArmado = ()=>{
  
  const [inputs, setInputs] = useState({});
  const [showModal,setShowModal] = useState(false)
  const [errorMsg, SetErrorMsg] = useState('')
  const [arrErrors, setArrErrors] = useState([])
  //const [productos, setProductos] = useState([])
  const [piezasAbas, setPiezasAbas] = useState([])
  const [piezasDepo, setPiezasDepo] = useState([])
  const [piezas, setPiezas] = useState([])
  const [celdaData, setCeldaData] = useState({})
  const [liderName, setLiderName] = useState ("-")
  //const liderName = sessionStorage.getItem('LiderUser')
    
  const queryParams = new URLSearchParams(window.location.search);
  const celda = queryParams.get('c')
     
  useEffect(()=>{
    fetchingPiezasAbas()
    fetchingPiezasDepo()
    fetchingProductos()
    fetchingCelda()
    // eslint-disable-next-line
  },[])
  useEffect (()=>{
    setPiezas(piezasAbas.concat(piezasDepo)) 
  },[piezasAbas,piezasDepo]) 
 
  const fetchingProductos = ()=>{
    // fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/armado/productos')
    //   .then((res)=>res.json())
    //   .then ((json)=>{
    //     setProductos(json)
    //   })
    //   .catch (err => console.log(err))
  }
  const fetchingPiezasAbas = ()=>{
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/abastecimiento/piezas')
      .then((res)=>res.json())
      .then ((json)=>{
        setPiezasAbas(json)
      })
      .catch (err => console.log(err))
  }
  const fetchingPiezasDepo = ()=>{
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/deposito/piezas')
      .then((res)=>res.json())
      .then ((json)=>{
        setPiezasDepo(json)
      })
      .catch (err => console.log(err))
  }
  const fetchingCelda = () => {
    fetch('http://192.168.11.5/totemsApp/Public/api.php?c=' + celda)
    .then((res)=>res.json())
    .then((json)=>{
      setCeldaData (json)
      let lider = json?.equipo[0]?.apellido + ', ' + json?.equipo[0]?.nombre
      setLiderName (lider)
    })
    .catch(res => {
      console.log('error en fetching celda es: ',res.statusText)
      SetErrorMsg(res.statusText)
    })    
  }

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'producto'|| name ==='insumo') {
      value=e.target.value.toUpperCase()
    }
    if (name === 'cantidad'|| name ==='duracion' || name ==='celda') {
      value= +e.target.value
    }
    setInputs (({...inputs, [name]: value}))
  }
  
  const handleCheckData = () => {
    let arr = []
    const celda = inputs?.celda
    if (celda < 0 || celda > 51){
      arr.push('Celda')
    }

    const cant = inputs?.cantidad
    if (cant<1) {
      arr.push('Cantidad')
    }
    const dur = inputs?.duracion
    if (dur<1) {
      arr.push('Duracion')
    }
    const ins = inputs?.insumo
    console.log(ins)
    const pzOk = piezas.findIndex(pz => pz.articulo===(ins)) + 1
    console.log('PiezaOk',pzOk)
    if (!pzOk) {
      arr.push('Insumo')
    }
    // const prod = inputs?.producto
    // const prodOk = productos.findIndex(pr => pr.producto===(prod)) + 1
    // if (!prodOk) {
    //   arr.push('Producto')
    // }
    return arr
  }
  
  const clearErrMsg = () => {
    setArrErrors([])
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const arr = handleCheckData()
    console.log ('resultado del arr', arr)
    if (arr.length !== 0){
      console.log('exit')
      setArrErrors(arr)
      return
    } 
    const today = new Date();
    const time = (today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
    inputs.time = time
    const date = (today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear());
    inputs.date = date
    inputs.lider = liderName
    inputs.celda = +celda
    inputs.producto = celdaData.nroProduccion
    inputs.idTurno = +celdaData.idTurno
    setInputs ({...inputs}) 
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs)
    };
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/armado/upload',options)
      .then(res=>{
        console.log('Respuetsa del servidor',res)
        if(res.ok){
          return(res)
        }else{
          throw res ;
        }
      }).then(res=>{
        const celd = inputs.celda
        const prod = inputs.producto
        openModal()
        setInputs({})
        setInputs({
          'celda':celd,
          'producto':prod
        })
        }
      )
      .catch(res => {
        console.log('error es: ',res.statusText)
        SetErrorMsg(res.statusText)
      })    
  }
  
  const closeModal = () => {
    SetErrorMsg('')
    setShowModal(false)
  }
  
  const openModal = () => {
    setShowModal(true)
  }

  return(
    <>
      <ModalOk
        close={closeModal}
        show={showModal}
      />
      <ModalError
        close={closeModal}
        errorMsg={errorMsg}
      />
      <form className={styles.armadoForm} autoComplete="off" onSubmit={handleSubmit} >
        <div className={styles.segment}>
          <h1>Relevamiento</h1>
        </div>
        <label >
          <input 
          className={`${styles.select} ${!inputs.lider ? styles.placeholder : ''}`}
          disabled
          onFocus={clearErrMsg}
          type="text" 
          name='lider' 
          value = {liderName}
          />
        </label>
        <label >
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Celda')  ? styles.visible:''}`}>
            Celda no válida
          </div>
          <input 
          className={styles.select}
          required
          onFocus={clearErrMsg}
          onWheelCapture={(e)=>e.target.blur()}
          type="number"
          name='celda' 
          //value={inputs.celda || ''}
          value = {celda || ''} 
          disabled
          onChange={handleChange} 
          placeholder={'Celda'}/>
        </label>
        <label >
          <select 
          className={`${styles.select} ${!inputs.motivo ? styles.placeholder : ''}`}
          required
          onFocus={clearErrMsg}
          type="text" 
          name='motivo' 
          value={inputs.motivo || ''}  
          onChange={handleChange}
          >
            <option className={styles.placeholder} disabled value = "" hidden> Motivo </option>"
            <option value={'incompleto'}>Incompleto</option>
            <option value= {'defecto'}>Defecto</option>
            <option value={'faltante'}>Faltante</option>
            <option value={'cambioCelda'}>Cambio de celda</option>
          </select>
        </label>
        <label >
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Duracion')  ? styles.visible:''}`}>
            Duración no válida
          </div>
          <input 
          className={styles.select}
          hidden = {!(inputs.motivo === 'faltante'  ||  inputs.motivo === 'cambioCelda')}
          required = {inputs.motivo === 'faltante'  ||  inputs.motivo === 'cambioCelda'}
          onFocus={clearErrMsg}
          onWheelCapture={(e)=>e.target.blur()}
          type="number"
          name='duracion' 
          value={inputs.duracion || ''}  
          onChange={handleChange} 
          placeholder={'Duración (en minutos)'}/>
        </label>
        <label >
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Cantidad')  ? styles.visible:''}`}>
            Cantidad no válida
          </div>
          <input 
          className={styles.select}
          hidden = {!(inputs.motivo === 'defecto' ||  inputs.motivo === 'incompleto')}
          required = {inputs.motivo === 'defecto' ||  inputs.motivo === 'incompleto'}
          onFocus={clearErrMsg}
          type="number"
          onWheelCapture={(e)=>e.target.blur()}
          name='cantidad' 
          value={inputs.cantidad || ''}  
          onChange={handleChange}
          placeholder={'Cantidad'}/>
        </label>
        <label>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Producto')  ? styles.visible:''}`}>
            Codigo de producto no válido
          </div>
          <input 
            className={`${styles.inputs} ${styles.producto}`}
            required
            onFocus={clearErrMsg}
            type="text" 
            name='producto' 
            // value = {inputs.producto || ''}
            value = {celdaData.nroProduccion  || ''}
            disabled
            onChange={handleChange}
            placeholder="Producto"/>
        </label>
        <label>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Insumo')  ? styles.visible:''}`}>
            Codigo de insumo no válido
          </div>
          <input 
           className={styles.inputs}
           required
           onFocus={clearErrMsg}
           type="text" 
           name='insumo'
           value={inputs.insumo || ''}  
           onChange={handleChange} 
           placeholder="Insumo"/>
        </label>
        <label>
          <textarea
          className={styles.textarea}
          onFocus={clearErrMsg}
          type="text" 
          name='descripcion' 
          value={inputs.descripcion || ''}  
          onChange={handleChange} 
          placeholder="Descripción"/>
        </label>
        <button type="submit" className={styles.button}>Relevar información</button>
      </form>
    </>
  )
}
export default InputArmado