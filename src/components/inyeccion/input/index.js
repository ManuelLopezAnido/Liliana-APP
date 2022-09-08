import styles from './inputDeposit.module.css';
import ModalOk from "../../commonComponents/modalOk/index";
import ModalError from "../../commonComponents/modal error";
import MachineList from '../../commonComponents/machine list';
import { useState , useEffect } from 'react';

const InputInyeccion =()=>{
  const [selectedMaq,setSelectedMaq] = useState('A1')
  const [inputs, setInputs] = useState({'produccion':[]});
  const [contador, setContador] = useState(0)
  const [arrErrors, setArrErrors] = useState([])
  const[showModal,setShowModal]=useState(false)
  const[errorMsg, SetErrorMsg] =useState('')
  const [piezasDeposito, setPiezasDeposito] = useState([])
  const [maquinas, setMaquinas] = useState([])
  const liderNameIny = sessionStorage.getItem('LiderUserIny')
  
  console.log(inputs)
  useEffect (()=>{
    basicInputs()
    fetchMachines()
    fetchingPiezas()
     // eslint-disable-next-line
  },[])
  const fetchingPiezas = ()=>{
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/deposito/piezas')
      .then((res)=>res.json())
      .then ((json)=>{
        setPiezasDeposito(json)
      })
      .catch ((err) => {
        console.log('Error fetching Piezas')
        console.log(err)
      })
  }
  const fetchMachines = () => {
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/data/machines')
      .then((res)=>res.json())
      .then((json)=>{
        setMaquinas(json)
      })
      .catch ((err) => {
        console.log('Error fetching Maquinas')
        console.log(err)
      })
  } 
  const basicInputs = () =>{
    const today = new Date();
    const time = (today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
    const d = today.getDate()
    const m = today.getMonth() + 1
    const y = today.getFullYear()
    const dat = (d + "/" + m + "/" + y);
    const day = (y + "-" + (m < 10 ? "0" + m : m ) + "-" + (d < 10 ? "0" + d : d));
    const hour = today.getHours()

    if (hour >=8 && hour < 16){
      inputs.shift = "morning"
    } else if (hour >= 16 && hour < 24){
      inputs.shift = "afternoon"
    } else {
      inputs.shift = "night"
    }
    inputs.day = day
    inputs.time = time
    inputs.dates = dat
    inputs.machine = selectedMaq
    inputs.lider = liderNameIny
    setInputs ({...inputs}) 
  }
  const handleChange = (e,i) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'pieza' || name === 'worker' || name === 'codigo') {
      value=e.target.value.toUpperCase()
    }
    if (name ==='cantidad'){
      value = parseInt(e.target.value)
    }
    if (i) {
      inputs.produccion[i-1][name]= value
    } else {
      inputs[name]=value
    }
    setInputs (({...inputs}))
    
  }
  const handleCheckData = () => {
    let arr = []
    const worker = inputs?.worker
    if (!worker){ //check against a workers DB here
      arr.push('Worker')
    }
    if (inputs.produccion.length === 0){
      arr.push("Incompleto")
    } else {
      inputs.produccion.forEach(pzProd => { 
        const found = piezasDeposito.findIndex((pz)=>{
          return (pz.articulo===pzProd.codigo)
        })
        if (found === -1) {
          arr.push('Codigo')
        } 
      });
    }
    inputs.produccion.forEach(pzProd => {
      if (pzProd.cantidad < 1) {
        arr.push('Cantidad')
      }
    })
    inputs.produccion.forEach(pzProd => {
      if (pzProd.scrap < 1) {
        arr.push('Scrap')
      }
    })
    return arr
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const arr = handleCheckData()
    console.log ('resultado del arr', arr)
    setArrErrors(arr)
    if (arr.length !== 0){
      console.log('exit')
      return
    } 
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs)
    };
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/inyeccion/upload',options)
      .then((res)=>{
        console.log('Respuetsa del servidor',res)
        if(!res.ok){
          throw (res)
        }
        openModal()
        return(res.json())
      })
      .then((json)=>{
        console.log('JSON: ',json)
        inputs.worker = undefined
        inputs.produccion = []
        setContador(0)
        setInputs({...inputs})
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
  const selectMachine = (maq) =>{
    setSelectedMaq (maq)
  }
  const clearErrMsg = () =>{
    setArrErrors([])
  }
  const newPz = () => {
    let divPiezas = []
    for(let i=1 ; i <= contador; i++ ) {
      divPiezas.push(i)
    }
    return (
      divPiezas.map ((i)=>{
        return(
          <div className={styles.newPz} key = {i}>
            <div className={styles.close} onClick={onClickRemovePz}>
              <span>&#x2715;</span>
            </div>
            <label>
              <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Codigo')  ? styles.visible:''}`}>
                Codigo no válido
              </div>
              <input 
                type="text"
                placeholder="Pieza"
                name="codigo"
                required
                value={inputs.produccion[i-1]?.codigo || ''}  
                onFocus={clearErrMsg}
                onChange={e => handleChange(e,i)}/>
            </label>
            <label>
              <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'cantidad')  ? styles.visible:''}`}>
                Cantidad no válida
              </div>
              <input 
                type = "number"
                placeholder="Cantidad"
                name = "cantidad"
                onWheelCapture={(e)=>e.target.blur()}
                required
                value = {inputs.produccion[i-1]?.cantidad || ''} 
                onFocus={clearErrMsg}
                onChange={e => handleChange(e,i)}
                />
            </label>
            <label>
              <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Worker')  ? styles.visible:''}`}>
                Cantidad no válida
              </div>
              <input
                name = "scrap"
                placeholder = "Scrap"
                type = "number"
                onWheelCapture={(e) => e.target.blur()}
                required
                value = {inputs.produccion[i-1]?.scrap || ''} 
                onFocus={clearErrMsg}
                onChange = {e => handleChange(e,i)}/>
            </label>
            <label>
              <textarea
                className={styles.textarea} 
                type='text'
                name='comentarios' 
                value={inputs.produccion[i-1]?.comentarios || ''} 
                onChange={e => handleChange(e,i)}
                placeholder="Comentarios"/>
            </label>
          </div>
        )
      })
    )
  }
  const onClickAddPz = () => {
    clearErrMsg()
    inputs.produccion.push({})
    setContador(contador+1)
  }
  const onClickRemovePz = () => {
    inputs.produccion.pop()
    setContador(contador - 1)
  }
  const closeModal=()=>{
    SetErrorMsg('')
    setShowModal(false)
  }
  const openModal=()=>{
    setShowModal(true)
  }
  return(
    <div className= {styles.deposit}>
      <ModalOk
        close={closeModal}
        show={showModal}
      />
      <ModalError
        close={closeModal}
        errorMsg={errorMsg}
      />
      <MachineList
        selectMachine = {selectMachine}
        maqs = {maquinas}
      />
      <form className={styles.depositForm} autoComplete="off" onSubmit={handleSubmit} >
        <div className={styles.segment}>
          <h1>Carga producción</h1>
        </div>
        <div className={styles.machine}>
          <span> {selectedMaq} </span>
        </div>
        <label>
          <input 
            type="text" 
            placeholder="Lider"
            name='lider' 
            disabled
            value={inputs.lider || ''}
            onChange={handleChange}
          />
        </label>
        <label className={styles.dateShift}>
          <select 
          required
          onFocus={clearErrMsg}
          type="text" 
          name='shift' 
          value={inputs.shift || ''}  
          onChange={handleChange}
          >
            <option className={styles.placeholder} disabled value = "" hidden> Turno </option>"
            <option value={'morning'}>Mañana</option>
            <option value= {'afternoon'}>Tarde</option>
            <option value={'night'}>Noche</option>
          </select>
          <input 
            type="date" 
            placeholder="Fecha"
            name='day' 
            value={inputs.day || ''}
            onFocus={clearErrMsg}
            onChange={handleChange}
          />
        </label>
        <label>
          <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Worker')  ? styles.visible:''}`}>
            Operario no registrado
          </div>
          <input
            required
            type="text" 
            placeholder="Operario"
            name='worker' 
            value={inputs.worker || ''} 
            onFocus={clearErrMsg}
            onChange={handleChange}
            />
        </label>
        <div className={`${styles.notValid} ${arrErrors.find(e=>e === 'Incompleto')  ? styles.visible:''}`}>
          Ingrese piezas producidas    
        </div>
        {
          newPz()
        }
        <div className={styles.plusSymbol} onClick={onClickAddPz}>
          <span className={styles.symbol}>
            <span>+</span>
          </span>
        </div>
        <button type="submit" className={styles.button}>Relevar información</button>
      </form>
    </div> 
  )

}
export default InputInyeccion