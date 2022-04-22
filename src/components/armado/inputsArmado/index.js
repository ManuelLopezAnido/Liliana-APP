import styles from './inputsarmado.module.css'
import { useState } from "react"
import ModalOk from "../../common components/modal ok";
import ModalError from "../../common components/modal error";
import piezas from "../../../data samples/piezas.json"

const InputArmado = ()=>{
  
  const [inputs, setInputs] = useState({});
  const[showModal,setShowModal]=useState(false)
  const[errorMsg, SetErrorMsg] =useState('')
  const [arrErrors, setArrErrors]= useState([])
  
  console.log(inputs)
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
    const arr = []//handleCheckData()
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
    fetch('http://192.168.11.139:4000/armado/relevameinto',options)
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
          placeholder={"jghas"}
          >
            <option className={styles.placeholder} disabled value = "" hidden> Motivo </option>"
            <option>Reproceso</option>
            <option>Incopleto</option>
            <option>Defecto</option>
            <option>Funcionamiento</option>
            <option>Faltante</option>
            <option>Otros</option>
          </select>
        </label>
        <label >
          <input 
          className={styles.select}
          hidden = {inputs.motivo === 'Faltante' ? false : true}
          required
          onFocus={clearErrMsg}
          type="number" 
          name='duracion' 
          value={inputs.duracion || ''}  
          onChange={handleChange} 
          placeholder={'Duración (en minutos)'}>
        </input>
        </label>
        <label >
          <select 
          className={`${styles.select} ${!inputs.lider ? styles.placeholder : ''}`}
          required
          onFocus={clearErrMsg}
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
            onFocus={clearErrMsg}
            type="text" 
            name='producto' 
            value={inputs.producto || ''}  
            onChange={handleChange} 
            placeholder="Producto"/>
        </label>
        <label>
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
          required
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