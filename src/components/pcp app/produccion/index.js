import styles from './produccion.module.css'
import { useState, useEffect } from 'react'
import {Fragment} from 'react'
import maquinas from '../../../data samples/maquinas.json'
const Produccion = (props) => {
  let dataTable=props.data
  const [openRows,setOpenRows] = useState([])
  const activeAcordion = (i) =>{
    openRows[i]=!openRows[i]
    setOpenRows([...openRows])
  }
  console.log('open row is:',openRows)
  return(
    <>
      <h3 className={styles.produccion}>
        Tablas producción
      </h3>
      <div>
        {maquinas.map((maq,index)=>{
          return(
            ' - ' + maq.Maquina + ' '
          )
        })}
      </div>
      <div>
        <table className={styles.foldTable}>
          <thead>
            <tr>
              <th>
                Maquina
              </th>
              <th>
                Fecha
              </th>
              <th>
                Pieza
              </th>
              <th>
                Nombre Pieza
              </th>
              <th>
                Molde
              </th>
              <th>
                Comentarios
              </th>
              <th>
                Cantidad            
              </th>
              <th>
                Material
              </th>
              <th>
                Color          
              </th>
              <th>
                Bocas
              </th>
              <th>
                Tiempo de Ciclo            
              </th>
            </tr>
          </thead>
          <tbody>
            {dataTable?.map((d,index) => {
            return (
              <Fragment key={index}>
                <tr className={`${styles.view} ${openRows[index]? styles.viewOpen : ''}`} onClick={()=>activeAcordion(index)}>
                  <td>
                    {d.Maquina}
                  </td>
                  <td>
                  {d.Fecha}
                  </td>
                  <td>
                    {d.Pieza}
                  </td>
                  <td>
                    {d.Nombre_pz}
                  </td>
                  <td>
                    {d.Molde}
                  </td>
                  <td>
                    {d.Comentarios}
                  </td>
                  <td>
                    {d.Comentarios}
                  </td>
                  <td>
                    {d.Cantidad}
                  </td>
                  <td>
                    {d.Material}
                  </td>
                  <td>
                    {d.Color}
                  </td>
                  <td>
                    {d.Bocas}
                  </td>
                  <td>
                    {d.Ti}
                  </td>
                </tr>
                <tr className={`${styles.fold} ${openRows[index]? styles.open : ''}`} >
                  <td colSpan='11' className={styles.foldContent} >
                    <h4>  
                        Lista de Piezas
                    </h4>
                    <table>
                      <thead>
                        <tr>
                          <th>
                            Pieza
                          </th>                                                
                          <th>
                            Cantidad
                          </th>                                                
                          <th>
                            Bocas
                          </th>                                                
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            AM1042
                          </td>
                          <td>
                            1000
                          </td>
                          <td>
                            2
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default Produccion