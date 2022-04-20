import { useState } from "react"
import ModalOk from "../common components/modal ok";
import ModalError from "../common components/modal error";
import styles from "./inputAbastecimiento.module.css"
const InputAbastecimiento = ()=>{
  const [inputs, setInputs] = useState({});
  const[showModal,setShowModal]=useState(false)
  const[errorMsg, SetErrorMsg] =useState('')
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs (({...inputs, [name]: value}))
  }
  const handleCheckData = ()=>{
    let arrErrors = []
    const codigo = inputs?.codigo
    if (codigo.lenght !== 6) {
      arrErrors.push('Codigo de pieza')
    }
    
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const today = new Date();
    const time = (today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
    console.log(time);
    inputs.time = time
    setInputs ({...inputs})
    console.log(inputs) 
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs)
    };
    fetch('http://192.168.11.139:4000/abastecimiento',options)
      .then(res=>{
        console.log(res.ok)
        if(res.ok){
         openModal()
        }else{
          throw res ;
        }
      })
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
      <form onSubmit={handleSubmit} className={styles.depositForm} >
        <div className={styles.segment}>
          <h1>Abastecimiento</h1>
        </div>
        <label>
          <input
            type="text" 
            name="codigo"
            value={inputs.codigo || ''}  
            onChange={handleChange} 
            onBlur={handleCheckData}
            placeholder="Codigo de insumo"/>
        </label>
        <label>
          <input 
            type="text" 
            name='estanteria' 
            value={inputs.estanteria || ''}  
            onChange={handleChange} 
            onBlur={handleCheckData}
            placeholder="Estantería"/>
        </label>
        <label>
          <input
            type="number" 
            name='posicion' 
            value={inputs.posicion || ''} 
            onChange={handleChange} 
            onBlur={handleCheckData}
            placeholder="Posición"/>
        </label>
        <label>
          <input
            type="number" 
            name='altura' 
            value={inputs.altura || ''} 
            onChange={handleChange} 
            onBlur={handleCheckData}
            placeholder="Altura"/>
        </label>
        <label>
          <input 
            type="number" 
            name='cantidad' 
            value={inputs.cantidad || ''} 
            onChange={handleChange} 
            onBlur={handleCheckData}
            placeholder="Cantidad"/>
        </label>
        <div className={styles.radioBox}>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'Alta'} 
              onChange={handleChange}
              onBlur={handleCheckData} 
              />
            <div>Alta</div>
          </label>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'Baja'} 
              onChange={handleChange}
              onBlur={handleCheckData}
              />
            <div>Baja</div>
          </label>
        </div>
        <button className = {inputs.radio ? '' : styles.buttonDisable } disabled={inputs.radio ? false : true }  type="submit">
          Cargar
        </button>
      </form>
    </div> 
    </>
  )
}
export default InputAbastecimiento
