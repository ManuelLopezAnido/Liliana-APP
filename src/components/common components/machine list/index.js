import { useState } from 'react'
import styles from './machineList.module.css'

const MachineList = (props)=>{
  const maquinas = props.maqs
  const [classMaq, setClassMaq] = useState('')
  const handleClick = (Maquina) =>{
    setClassMaq (Maquina)
    props.selectMachine(Maquina)
  }
  return (
    <>
      <div className={styles.machineList}>
        {maquinas.map((maq,index)=>{
          return(
            <div 
              key={maq.Maquina} 
              className = {`
                ${styles.machine}
                ${index === 0 && !classMaq ? styles.maqSelected : ''}
                ${maq.Maquina === classMaq ? styles.maqSelected : ''}`
                } 
              onClick={() => handleClick(maq.Maquina)}>
              {' ' + maq.Maquina + ' '}
            </div>
          )
        })}
      </div>
      <div className={styles.machineSelect}> 
      <label>Maquina: </label>
      <select name='Maquina'>
        {maquinas.map(maq=>{
          return(
            <option key={maq.Maquina} value={maq.Maquina}>
              {maq.Maquina}
            </option>
          )
        })}
      </select>
    </div>
  </>
  )
}
export default MachineList