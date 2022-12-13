import styles from './total.module.css'
const Total = (props) => {
  if (!props.codigo) {
    return null
  }

  const tot = props.table.reduce((prev,curr) => {
    return (
      prev + curr.supplies?.reduce((prev2,curr2)=>{
        return(
          prev2 + curr2.amount
        )
      },0)
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
export default Total