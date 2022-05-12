import styles from './totaldeposit.module.css'
const TotalDeposit = (props) => {
  if (!props.codigo) {
    return null
  }

  const tot = props.table.reduce((prev,curr) => {
    return(
      prev + curr.cantidad
    )
  },0)
  return ( 
    <tr className={styles.total}>
      <td>
        Total: 
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td className = {styles.valortotal}>
        {tot}
      </td>
    </tr>
  )
}
export default TotalDeposit