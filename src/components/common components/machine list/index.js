import styles from './machineList.module.css'

const MachineList = (props)=>{
  const maquinas = props.maqs
  return (
    <>
      <div className={styles.machineList}>
          {maquinas.map((maq,index)=>{
            return(
              <div key={maq.Maquina} className={styles.machine} onClick={()=>props.selectMachine(maq.Maquina)}>
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