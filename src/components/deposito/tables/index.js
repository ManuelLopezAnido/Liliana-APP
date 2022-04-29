import styles from './tablasDeposito.module.css'
import { useState, useEffect } from 'react'
import { Fragment } from 'react'
import piezas from '../../../data samples/piezas.json'
const TablasDeposito =() =>{
  const [dataAbs, setDataAbs] = useState([])
  const [dataAbsFiltred,setDataAbsFiltred] = useState([])
  const [inputs, setInputs] = useState([])
  useEffect (()=>{
    fetch('http://192.168.11.139:4000/api/deposito/tablas')
      .then((res)=>res.json())
      .then ((json)=>{
        setDataAbs (json)
        setDataAbsFiltred(json)
      })
      .catch ((err) => {
        console.log('error table: ',err)
      })
  },[])
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let input = inputs
    input[name] = value
    console.log('valores: ',input.codigo, input.estanteria)
    setInputs({...input})
    if(!input.codigo){
      if(!input.estanteria){
        setDataAbsFiltred([...dataAbs])
      }
      else{
        let dataAbsFil = dataAbs.filter((pos)=>{
          return(
            pos.estanteria===input.estanteria
          )    
        })
        setDataAbsFiltred([...dataAbsFil])
      }
    } else {
      if(!input.estanteria){
        let dataAbsFil = dataAbs.filter((pos)=>{
          return(
            pos.codigo===input.codigo
          )    
        })
        setDataAbsFiltred([...dataAbsFil])
      } else {
        let dataAbsFil = dataAbs.filter((pos)=>{
          return(
            (pos.codigo===input.codigo) && (pos.estanteria===input.estanteria)
          )    
        })
        setDataAbsFiltred([...dataAbsFil])
      }
    }
  }
  const handleSubmit=(e)=>{

  }
  
  return(
  <>
    <div className={styles.filter}>
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.depositForm} >
        <label className={styles.filtros}>
          <div>
          Filtros: 
          </div> 
        </label>
        <label>
          <input
            required
            type="text" 
            name="codigo"
            value={inputs.codigo || ''}  
            onChange={handleChange} 
            placeholder="Codigo de insumo"/>
        </label>
        <label>
          <input 
            required
            type="text" 
            name='estanteria' 
            value={inputs.estanteria || ''}  
            onChange={handleChange} 
            placeholder="Estantería"/>
        </label>
      </form>
    </div>
    <div>
      <table className={styles.foldTable}>
        <colgroup>
          <col className={styles.colEstanteria}/>
          <col className={styles.colPosicion}/>
          <col/>
          <col className={styles.colCodigo}/>
          <col className={styles.colCantidad}/>
          <col className={styles.colDescripcion}/>
          <col/>
        </colgroup>
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
              Descripción
            </th>
            <th>
              Comentarios
            </th>
          </tr>
        </thead>
        <tbody>
          {dataAbsFiltred?.map((d,index) => {
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
                  {d.cantidad || '-'}
                </td>
                <td>
                  {piezas.find((pz)=>{return (pz.Articulo===d.codigo)
                  })?.Detalle
                  }
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
export default TablasDeposito