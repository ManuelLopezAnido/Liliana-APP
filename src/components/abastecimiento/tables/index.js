import styles from './tablasAbastecimiento.module.css'
import { useState, useEffect } from 'react'
import { Fragment } from 'react'
import Total from '../../common components/total'
const TablasAbastecimiento =() =>{
  const [dataAbs, setDataAbs] = useState([])
  const [dataAbsFiltred,setDataAbsFiltred] = useState([])
  const [inputs, setInputs] = useState({})
  const [piezas, setPiezas] = useState([])

  useEffect (()=>{
    fetchingTable()
    fetchingPiezas()
  },[])

  const fetchingTable = ()=>{
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/abastecimiento/tables')
      .then((res)=>res.json())
      .then ((json)=>{
        setDataAbs (json)
        setDataAbsFiltred(json)
      })
      .catch (err => console.log(err))
  }
  const fetchingPiezas = ()=>{
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/abastecimiento/piezas')
      .then((res)=>res.json())
      .then ((json)=>{
        setPiezas(json)
      })
      .catch (err => console.log(err))
  }

  console.log(dataAbsFiltred)
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.toUpperCase();
    let input = inputs
    input[name] = value
    console.log('valores: ', input, input.codigo, input.estanteria, input.posicion, input.altura)
    
    setInputs({...input})
    if(!input.codigo){
      if(!input.estanteria && !input.posicion && !input.altura){
        setDataAbsFiltred([...dataAbs])
      }
      else{
        let dataAbsFil = dataAbs.filter((pos)=>{
          return(
            (input.estanteria ? (input.estanteria === pos.estanteria) : true) &&
            (input.posicion ? (+input.posicion === pos.posicion) : true) &&
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
              pos.codigo.includes(input.codigo)
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
              pos.codigo.includes(input.codigo)
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
  const comentarios = (d)=>{
    switch (d.comentarios) {
      case "EN USO":
        return styles.enUso;
      case "CONTAR":
        return styles.contar;
      default:
        return '';
    }
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
            placeholder="C??digo de insumo"/>
        </label>
        <label>
          <input 
            type="text" 
            name='estanteria' 
            value={inputs.estanteria || ''}  
            onChange={handleChange} 
            placeholder="Estanter??a"/>
        </label>
        <label>
          <input 
            hidden = {!inputs.estanteria || inputs.codigo}
            type="text" 
            name='posicion' 
            value={inputs.posicion || ''}  
            onChange={handleChange} 
            placeholder="Posici??n"/>
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
              Estanter??a
            </th>
            <th>
              Posici??n
            </th>
            <th>
              Altura
            </th>
            <th>
              C??digo
            </th>
            <th>
              Cantidad
            </th>
            <th>
              Descripci??n
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
                      <td
                        // className = {(estan.comentarios === 'EN USO') ? styles.enUso : '' }
                        className = {comentarios(d)}
                      >
                        { d.codigo ? 
                          d.cantidad === 0 ? 'Indefinido' : d.cantidad :
                          '-'}
                      </td>
                      <td>
                        {piezas.find((pz)=>{return (pz.articulo === d.codigo)
                        })?.detalle
                        }
                      </td>
                      <td>
                        {d.comentarios}
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