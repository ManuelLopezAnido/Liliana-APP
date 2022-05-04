import styles from './inputsarmado.module.css'
import { useState } from "react"
import ModalOk from "../../common components/modal ok";
import ModalError from "../../common components/modal error";
import piezas from "../../../data samples/piezas.json"
import productos from "../../../data samples/productos.json"

const InputArmado = ()=>{
  
  const [inputs, setInputs] = useState({});
  const[showModal,setShowModal]=useState(false)
  const[errorMsg, SetErrorMsg] =useState('')
  const [arrErrors, setArrErrors]= useState([])
  const liderName = sessionStorage.getItem('LiderUser')

  console.log(inputs)
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'producto'|| name ==='insumo') {
      value=e.target.value.toUpperCase()
    }
    setInputs (({...inputs, [name]: value}))
  }
  const handleCheckData = () => {
    let arr = []
    const ins = inputs?.insumo
    const pzOk = piezas.find(pz =>pz.Articulo===('ZZ'+ins))?.Articulo
    console.log('pzOk: ',pzOk)
    if (!pzOk) {
      arr.push('Insumo')
    }
    const cant = inputs?.cantidad
    if (cant<1) {
      arr.push('Cantidad')
    }
    const dur = inputs?.duracion
    if (dur<1) {
      arr.push('Duracion')
    }
    const prod = inputs?.producto
    const prodOk = productos.find(pr =>pr.Articulo===(prod))?.Articulo
    if (!prodOk) {
      arr.push('Producto')
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
    const date = (today.getDate() + "/" + (today.getMonth() + 1) + ":" + today.getFullYear());
    inputs.date = date
    setInputs ({...inputs}) 
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs)
    };
    fetch('http://192.168.11.139'+ process.env.serverPORT +'/api/armado/upload',options)
      .then(res=>{
        console.log('Respuetsa del servidor',res.ok)
        if(res.ok){
          return(res)
        }else{
          throw res ;
        }
      }).then(res=>{
        const prod = inputs.producto
        openModal()
        setInputs({})
        setInputs({'producto':prod})
        }
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
          </select>
        </label>
        <label >
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Duracion')  ? styles.visible:''}`}>
            Duración no válida
          </div>
          <input 
          className={styles.select}
          hidden = {!(inputs.motivo === 'faltante')}
          required = {inputs.motivo === 'faltante'}
          onFocus={clearErrMsg}
          type="number" 
          name='duracion' 
          value={inputs.duracion || ''}  
          onChange={handleChange} 
          placeholder={'Duración (en minutos)'}>
          </input>
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
          name='cantidad' 
          value={inputs.cantidad || ''}  
          onChange={handleChange}
          placeholder={'Cantidad'}>
          </input>
        </label>
        <label >
          <input 
          className={`${styles.select} ${!inputs.lider ? styles.placeholder : ''}`}
          disabled
          onFocus={clearErrMsg}
          type="text" 
          name='lider' 
          value={liderName}  
          onChange={handleChange} 
          />
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
            value={inputs.producto || ''}
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