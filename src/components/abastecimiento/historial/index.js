import styles from './historialAbastecimiento.module.css'
import { useState, useEffect } from 'react'
import { Fragment } from 'react'

const HistorialAbastecimiento = () =>{
 
  const [dataInputs, setDataInputs] = useState([])
  const [piezas, setPiezas] = useState([])
  const [inputs, setInputs] = useState({month: new Date().getMonth()+1})

  const months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"]

  useEffect(()=>{
    fetchingPiezas()
  },[])


  useEffect(()=>{
    fetchingTable()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[inputs])

  const fetchingPiezas = () => {
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/data/piezas/abastecimiento')
      .then((res)=>res.json())
      .then ((json)=>{
        setPiezas(json)
      })
      .catch (err => console.log(err))
  }
  const fetchingTable = ()=>{
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/abastecimiento/inputs/'+ inputs.month)
      .then((res)=>res.json())
      .then ((json)=>{
        json.reverse()
        setDataInputs (json)
      })
      .catch (err => console.log(err))
  }


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs (({...inputs, [name]: value}))
  }


  const SumaDown = (inp) => {
    switch (inp.type){
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

  return(
  <>
    <select 
      className={`${styles.select}`}
      required
      type="text" 
      name='month' 
      value={inputs.month || ''}  
      onChange={handleChange} 
    >
      <option disabled value="" hidden> MES </option>"
      {months.map ((month, index)=>{
        return(
          <option value={index+1} key={month}>
            {month}
          </option>
        )
      }) }
      </select>
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
                    {inp.code}
                  </td>
                  <td>
                    {piezas.find((pz)=>{
                      return (pz.articulo===inp.code)
                      })?.detalle
                    }
                  </td>
                  <td>
                    {inp.rack + '-' + inp.position + '-' + (inp.height || "?")}
                  </td>
                  <td>
                    {inp.amount}
                  </td>
                  <td>
                    {SumaDown(inp)}
                  </td>
                  <td>
                    {inp.timeSend}
                  </td>
                  <td>
                    {inp.dateSend}
                  </td>
                  <td>
                    {inp.worker}
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