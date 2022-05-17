import styles from './criticosAbastecimiento.module.css'
import { useState, useEffect } from 'react'
import { Fragment } from 'react'
import piezas from '../../../data samples/piezas.json'
import Total from '../../common components/total'
const TablasAbastecimiento =() =>{
  const [dataAbs, setDataAbs] = useState([])
  const [dataAbsFiltred,setDataAbsFiltred] = useState([])
  const [inputs, setInputs] = useState([])
  const fetchingTable = ()=>{
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/abastecimiento/tables')
      .then((res)=>res.json())
      .then ((json)=>{
        setDataAbs (json)
        setDataAbsFiltred(json)
      })
      .catch (err => console.log(err))
  }
  useEffect (()=>{
    fetchingTable()
  },[])
  console.log(dataAbsFiltred)
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.toUpperCase();
    let input = inputs
    input[name] = value
    console.log('valores: ',input.codigo)
    
    setInputs({...input})
    if(!input.codigo){
      if(!input.estanteria && !input.posicion && !input.altura){
        setDataAbsFiltred([...dataAbs])
      }
      else{
        let dataAbsFil = dataAbs.filter((pos)=>{
          return(
            (input.estanteria ? (input.estanteria === pos.estanteria) : true) &&
            (input.posicion ? (input.posicion === pos.posicion) : true) &&
            (input.altura ? (input.altura === pos.altura) : true)
          )    
        })
        setDataAbsFiltred([...dataAbsFil])
      }
    } 
    else {
      if(!input.estanteria){
        const dataAbsFil = dataAbs.map((estan)=>{
          const insumosFiltred = estan.insumos.filter((pos)=>{
            return(
              pos.codigo===input.codigo
            )    
          })
          if (!insumosFiltred.length){
            return false
          }
          estan.insumos = [...insumosFiltred]
          return(estan)
        }).filter(est=>est)
        console.log('DATA FILTRADA: ',dataAbsFil)
        setDataAbsFiltred([...dataAbsFil])
      } else {
        const dataAbsFil = dataAbs.map((estan)=>{
          const insumosFiltred = estan.insumos.filter((pos)=>{
            return(
              pos.codigo===input.codigo
            )    
          })
          if (!insumosFiltred.length || estan.estanteria!==input.estanteria){
            return false
          }
          estan.insumos = [...insumosFiltred]
          return(estan)
        }).filter(est=>est)
        console.log('DATA FILTRADA: ',dataAbsFil)
        setDataAbsFiltred([...dataAbsFil])
      }
    }
  }
  const cantPz=(pz)=>{
    const tot = dataAbs.reduce((prev,curr) => {
      return (
        prev + curr.insumos?.reduce((prev2,curr2) => {
          if (curr2.codigo === pz){
            return(
              prev2 + curr2.cantidad
            )
          } else {
            return(prev2)
          }
        },0)
      )
    },0)
    return(tot)
  }
  
  return(
  <>
    <div className={styles.filter}>
      <form autoComplete="off" className={styles.depositForm} >
        <label className={styles.filtros}>
          <div>
          Filtros: 
          </div> 
        </label>
        <label>
          <input
            type="text" 
            name="codigo"
            value={inputs.codigo || ''}  
            onChange={handleChange} 
            placeholder="Código de insumo"/>
        </label>
        <label>
          <input 
            type="text" 
            name='estanteria' 
            value={inputs.estanteria || ''}  
            onChange={handleChange} 
            placeholder="Estantería"/>
        </label>
        <label>
          <input 
            hidden = {!inputs.estanteria || inputs.codigo}
            type="text" 
            name='posicion' 
            value={inputs.posicion || ''}  
            onChange={handleChange} 
            placeholder="Posición"/>
        </label>
        <label>
          <input 
            hidden = {!inputs.estanteria || inputs.codigo}
            type="text" 
            name='altura' 
            value={inputs.altura || ''}  
            onChange={handleChange} 
            placeholder="Altura"/>
        </label>
          <button 
            className={styles.reloadButton}
            onClick={()=>fetchingTable()}>
            <span className={styles.reload}>&#x21bb;</span>
          </button>
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
              Pieza
            </th>
            <th>
              Descripción
            </th>
            <th>
              Familia
            </th>
            <th>
              Cantidad
            </th>
            <th>
              Minimo
            </th>
            <th>
              Porcentaje
            </th>
            <th>
              Cant de palets
            </th>
          </tr>
        </thead>
        <tbody>
          {piezas?.map((pz,index) => {
            return(
              <Fragment key={index}>
                <tr className={styles.view} >
                  <td>
                    {pz.Articulo}
                  </td>
                  <td>
                    {pz.Detalle}
                  </td>
                  <td>
                    {'-'}
                  </td>
                  <td>
                    {cantPz(pz.Articulo)}
                  </td>
                  <td>
                    {'-'}
                  </td>
                  <td>
                    {'-'}
                  </td>
                  <td>
                    {'-'}
                  </td>
                </tr>
              </Fragment>
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