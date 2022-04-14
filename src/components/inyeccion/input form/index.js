import styles from './inputForm.module.css';
import MachineList from '../../common components/machine list';
import maquinas from '../../../data samples/maquinas.json'
const InputForm =()=>{
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
          <h1>Sign up</h1>
        </div>
        <label>
          <input type="text" placeholder="Email Address"/>
        </label>
        <label>
          <input type="passwrod" placeholder="Password" autoComplete='on'/>
        </label>
        <div className={styles.input_group}>
          <label>
            <input type="text" placeholder="Email Address"/>
          </label>
        </div>
      </form>
    </div> 
  )

}
export default InputForm