import styles from './inputForm.module.css';
import MachineList from '../../common components/machine list';
import maquinas from '../../../data samples/maquinas.json'
const InputInyeccion =()=>{
  const selectMachine = (maq) =>{
    console.log('click en: ', maq)
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
        <div className={styles.segment}>
          <h1>A1</h1>
        </div>
        <label>
          <input type="text" placeholder="Lider"/>
        </label>
        <label>
          <input type="text" placeholder="Turno"/>
        </label>
        <label>
          <input type="text" placeholder="Máquina"/>
        </label>
        <label>
          <input type="text" placeholder="Operario"/>
        </label>
        <label>
          <input type="text" placeholder="Cantidad"/>
        </label>
      </form>
    </div> 
  )

}
export default InputInyeccion