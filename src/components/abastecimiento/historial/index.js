import styles from './historialAbastecimiento.module.css'
import { useState, useEffect } from 'react'
import { Fragment } from 'react'

const HistorialAbastecimiento = () =>{
 
  const [dataInputs, setDataInputs] = useState([])
  const [dataInputsFiltred,setDataInputsFiltred] = useState([])
  const [piezas, setPiezas] = useState([])

  useEffect(()=>{
    fetchingPiezas()
    fetchingTable()
  },[])

  const fetchingPiezas = () => {
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/abastecimiento/piezas')
      .then((res)=>res.json())
      .then ((json)=>{
        setPiezas(json)
      })
      .catch (err => console.log(err))
  }
  const fetchingTable = ()=>{
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/abastecimiento/inputs')
      .then((res)=>res.json())
      .then ((json)=>{
        json.reverse()
        setDataInputs (json)
        setDataInputsFiltred(json)
      })
      .catch (err => console.log(err))
  }

  const SumaDown = (inp) => {
    switch (inp.radio){
      case 'add':
        return('Sumar')
      case 'down':
        return('Bajar')
      case 'replace':
        return('Remplazar')
      case 'clean':
        return('Vaciar')
      default: return ('??')
    }
  }

  console.log(dataInputsFiltred)

  return(
  <>
    <div>
      <table className={styles.foldTable}>
        <colgroup>
          <col className={styles.colCodigo}/>
          <col className={styles.colDescripcion}/>
          <col className={styles.colEstanteria}/>
          <col className={styles.colCantidad}/>
          <col className={styles.colCarga}/>
          <col/>
        </colgroup>
        <thead>
          <tr>
            <th>
              Pieza
            </th>
            <th>
              Descripción
            </th>
            <th>
              Estanteria
            </th>
            <th>
              Cantidad
            </th>
            <th>
              Tipo
            </th>
            <th>
              Hora
            </th>
            <th>
              Fecha
            </th>
            <th>
              Operario
            </th>
          </tr>
        </thead>
        <tbody>
          {dataInputs.reverse().map((inp,index) => {
            return(
              <Fragment key={index}>
                <tr className={styles.view} >
                  <td>
                    {inp.codigo}
                  </td>
                  <td>
                    {piezas.find((pz)=>{
                      return (pz.articulo===inp.codigo)
                      })?.Detalle
                    }
                  </td>
                  <td>
                    {inp.estanteria + '-' + inp.posicion + '-' + inp.altura }
                  </td>
                  <td>
                    {inp.cantidad}
                  </td>
                  <td>
                    {SumaDown(inp)}
                  </td>
                  <td>
                    {inp.time}
                  </td>
                  <td>
                    {inp.date}
                  </td>
                  <td>
                    {inp.operario}
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
export default HistorialAbastecimiento