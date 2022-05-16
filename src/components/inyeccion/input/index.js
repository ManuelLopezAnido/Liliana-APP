import styles from './inputDeposit.module.css';
import MachineList from '../../common components/machine list';
import maquinas from '../../../data samples/maquinas.json'
import { useState } from 'react';

const InputInyeccion =()=>{
  const [selectedMaq,setSelectedMaq] = useState('A1')
  const [inputs, setInputs] = useState({'produccion':[{}]});
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'pieza') {
      value=e.target.value.toUpperCase()
    }
    if (name ==='cantidad'){
      value = parseInt(e.target.value)
    }
    setInputs (({...inputs, [name]: value}))
  }
  const selectMachine = (maq) =>{
    setSelectedMaq (maq)
  }
  return(
    <div className= {styles.deposit}>
      <MachineList
        selectMachine = {selectMachine}
        maqs = {maquinas}
      />
      <form className={styles.depositForm}>
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
            value={inputs.lider || ''} 
            onChange={handleChange}
          />
        </label>
        <label className={styles.dateShift}>
          <input 
            type="text" 
            placeholder="Turno"
            name='turno' 
            value={inputs.turno || ''} 
            onChange={handleChange}
          />
          <input type="text" placeholder="Fecha"/>
         </label>
        <label>
          <input type="text" placeholder="Máquina"/>
        </label>
        <label>
          <input type="text" placeholder="Operario"/>
        </label>
        <div className={styles.newPz}>
          <div className={styles.close}>
            <span>&#x2715;</span>
          </div>
          <label>
            <input type="text" placeholder="Pieza"/>
          </label>
          <label>
            <input type="text" placeholder="Cantidad"/>
          </label>
          <label>
            <input type="text" placeholder="Scrap"/>
          </label>
          <label>
            <textarea
              className={styles.textarea} 
              type='text'
              name='comentarios' 
              value={inputs.lider || ''} 
              onChange={handleChange}
              placeholder="Comentarios"/>
          </label>
        </div>
        <div className={styles.plusSymbol}>
          <span className={styles.symbol}>
            <span>+</span>
          </span>
        </div>
      </form>
    </div> 
  )

}
export default InputInyeccion