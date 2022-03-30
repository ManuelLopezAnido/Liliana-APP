import styles from './produccion.module.css'
//import { useState, useEffect } from 'react'
import maquinas from '../../../data samples/maquinas.json'
const Produccion = (props) => {
  let dataTable=props.data
  console.log(maquinas) 
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
      <table>
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
            <tr key={index}>
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
            )
          })} 
        </tbody> 
      </table>
    </div>
    </>
  )
}

export default Produccion