import styles from './total.module.css'
const Total = (props) => {
  if (!props.codigo) {
    return null
  }

  console.log('FILTRDADO: ',props.table)
  const tot = props.table.reduce((prev,curr) => {
    return (prev + curr.cantidad)
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
export default Total