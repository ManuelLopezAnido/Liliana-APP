import { useState } from "react"
import styles from "./inputAbastecimiento.module.css"
const InputAbastecimiento = ()=>{
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs (({...inputs, [name]: value}))
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
      .then ((res)=>{
        console.log('respuesta del servidor',res)
      })
      .catch (err => console.log(err))}
  return(
    <>
      <div className= {styles.deposit}>
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
            placeholder="Codigo de insumo"/>
        </label>
        <label>
          <input 
            type="text" 
            name='estanteria' 
            value={inputs.estanteria || ''}  
            onChange={handleChange} 
            placeholder="Estantería"/>
        </label>
        <label>
          <input
            type="number" 
            name='posicion' 
            value={inputs.posicion || ''} 
            onChange={handleChange} 
            placeholder="Posición"/>
        </label>
        <label>
          <input
            type="number" 
            name='altura' 
            value={inputs.altura || ''} 
            onChange={handleChange} 
            placeholder="Altura"/>
        </label>
        <label>
          <input 
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
              onChange={handleChange} 
              />
            <div>Alta</div>
          </label>
          <label className={styles.container}>
            <input 
              type="radio" 
              name="radio"
              value={'Baja'} 
              onChange={handleChange} 
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
