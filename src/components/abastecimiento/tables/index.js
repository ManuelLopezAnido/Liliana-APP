import styles from './tablasAbastecimiento.module.css'
import { useState, useEffect } from 'react'
import { Fragment } from 'react'
import piezas from '../../../data samples/piezas.json'
import Total from '../../common components/total'
const TablasAbastecimiento =() =>{
  const [dataAbs, setDataAbs] = useState([])
  const [dataAbsFiltred,setDataAbsFiltred] = useState([])
  const [inputs, setInputs] = useState([])
  console.log(dataAbsFiltred)
  useEffect (()=>{
    fetch('http://192.168.11.139'+ process.env.serverPORT +'/api/abastecimiento/tables')
      .then((res)=>res.json())
      .then ((json)=>{
        setDataAbs (json)
        setDataAbsFiltred(json)
      })
      .catch (err => console.log(err))
  },[])
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.toUpperCase();
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
        let dataAbsFil = dataAbs.map((estan)=>{
          const insumosFiltred = estan.insumos.filter((pos)=>{
            return(
              pos.codigo===input.codigo
            )    
          })
          if (!insumosFiltred.length){
            estan.insumos = [...insumosFiltred]
            return(
              estan
            )
          } else {
            return false
          }
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
            placeholder="Código de insumo"/>
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
              Estantería
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
          {dataAbsFiltred?.map((estan,index) => {
            return(
              estan.insumos.map((d,subIndex)=>{
                return (
                  <Fragment key={index * 10 + subIndex}>
                    <tr className={styles.view} >
                      <td>
                        {estan.estanteria}
                      </td>
                      <td>
                      {estan.posicion}
                      </td>
                      <td>
                        {estan.altura}
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
                        {estan.observaciones}
                      </td>
                    </tr>
                  </Fragment>
                )
              })
            )
          })}
          <Total
            codigo = {inputs.codigo}
            table = {dataAbsFiltred}
          />
        </tbody> 
      </table>
    </div>
  </>
  )
}
export default TablasAbastecimiento