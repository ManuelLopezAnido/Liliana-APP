import styles from './tablasAbastecimiento.module.css'
import { useState, useEffect } from 'react'
import { Fragment } from 'react'
const TablasAbastecimiento =() =>{
  const [dataAbs, setData] = useState([])
  useEffect (()=>{
    fetch('http://192.168.11.139:4000/abastecimiento/tables')
      .then((res)=>res.json())
      .then ((json)=>{
        setData (json)
      })
      .catch (err => console.log(err))
  },[])
  console.log(dataAbs)
  return(
    <>
    <div>
      Tablas
    </div>
    <div>
         <table className={styles.foldTable}>
         <thead>
           <tr>
             <th>
               Estanteria
             </th>
             <th>
               Posición
             </th>
             <th>
               Altura
             </th>
             <th>
               Código
             </th>
             <th>
               Cantidad
             </th>
             <th>
               Comentarios
             </th>
           </tr>
         </thead>
         <tbody>
           {dataAbs?.map((d,index) => {
           return (
             <Fragment key={index}>
               <tr className={styles.view} >
                 <td>
                   {d.estanteria}
                 </td>
                 <td>
                 {d.posicion}
                 </td>
                 <td>
                   {d.altura}
                 </td>
                 <td>
                   {d.codigo}
                 </td>
                 <td>
                   {d.cantidad}
                 </td>
                 <td>
                   {d.observaciones}
                 </td>
               </tr>
             </Fragment>
             )
           })} 
         </tbody> 
       </table>
       </div>
    </>
  )
}
export default TablasAbastecimiento