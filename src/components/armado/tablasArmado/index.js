import styles from './tablasArmado.module.css'
import { useState, useEffect } from 'react'
import { Fragment } from 'react'

const TablasArmado = () =>{
 
  const [dataInputs, setDataInputs] = useState([])
  const [dataInputsFiltred, setDataInputsFiltred] = useState([])
  const [selectedColumn, setSelectedColumn] = useState("")
  const [filters , setFilters] = useState({})

  useEffect(()=>{
    fetchingInputs()
  },[])

  const fetchingInputs = ()=>{
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/armado/inputs')
      .then((res)=>res.json())
      .then ((json)=>{
        json.reverse()
        setDataInputs (json)
        setDataInputsFiltred(json)
      })
      .catch (err => console.log(err))
  }
 
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value.toUpperCase();
    let input = filters
    input[name] = value

    const convertDate = (strDate, separator = "/") =>{
      const [d,m,y] = strDate.split(separator)
      return new Date (y,  m - 1, d).getTime()
    }
        
    if (input.dates) {
      let [y,m,d] = input.dates.split("-") 
      input.dates = new Date (y,m-1,d).getTime()
    }

    setFilters({...input})
    console.log("filtros: ", filters)
    
    let dataInputsFiltred = dataInputs.filter((dataf)=>{
      return(
        (filters.celda ? (dataf.celda === +filters.celda) : true) &&
        (filters.producto ? (dataf.producto.includes(filters.producto)) : true) &&
        (filters.insumo ? (dataf.insumo.includes(filters.insumo)) : true) &&
        (filters.dates ? (convertDate(dataf.date) === filters.dates) :  true)
      )    
    })
    setDataInputsFiltred([...dataInputsFiltred])
  }
 
  const orderNumRows = (column) => {
    if (column === selectedColumn){
      dataInputsFiltred.reverse()
    } else {
      setSelectedColumn(column)
      dataInputsFiltred.sort((a,b)=>{return (a[column] - b[column])})
    }
    setDataInputsFiltred([...dataInputsFiltred])
  }

  const orderAlpRows = (column) => {
    if (column === selectedColumn){
      dataInputsFiltred.reverse()
    } else {
      setSelectedColumn(column)
     dataInputsFiltred.sort((a,b)=>{return (a[column].localeCompare(b[column]))})
    }
    setDataInputsFiltred([...dataInputsFiltred])
  }
  console.log(dataInputsFiltred)

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
            name="celda"
            value={filters.celda || ''}  
            onChange={handleChange} 
            placeholder="Numero de celda"/>
        </label>
        <label>
          <input 
            type="text" 
            name='producto' 
            value={filters.producto || ''}  
            onChange={handleChange} 
            placeholder="Producto"/>
        </label>
        <label>
          <input 
            type="text" 
            name='insumo' 
            value={filters.insumo || ''}  
            onChange={handleChange} 
            placeholder="Insumo"/>
        </label>
        <label>
          <input 
            type="date" 
            name='dates' 
            value={filters.date || ''}  
            onChange={handleChange} 
            placeholder="Fecha"/>
        </label>
          <button 
            className={styles.reloadButton}
            onClick={()=>fetchingInputs()}>
            <span className={styles.reload}>&#x21bb;</span>
          </button>
      </form>
    </div>
    <div>
      <table className={styles.foldTable}>
        <colgroup>
          <col className={styles.colCelda}/>
          <col className={styles.colProducto}/>
          <col className={styles.colMotivo}/>
          <col className={styles.colInsumo}/>
          <col className={styles.colCantidad}/>
          <col className={styles.colDescripcion}/>
          <col className={styles.colTime}/>
          <col className={styles.colDate}/>
          <col className={styles.colLider}/>
          <col/>
        </colgroup>
        <thead>
          <tr>
            <th 
              className={styles.sortable}
              onClick = {()=>orderNumRows('celda')}> 
              Celda
            </th>
            <th 
              className={styles.sortable}
              onClick = {()=>orderAlpRows('producto')} >
              Producto
            </th>
            <th>
              Motivo
            </th>
            <th 
              className={styles.sortable}
              onClick = {()=>orderAlpRows('insumo')} >
              Insumo
            </th>
            <th>
              Cantidad
            </th>
            <th>
              Descripción
            </th>
            <th>
              Hora
            </th>
            <th 
              className={styles.sortable}
              onClick = {()=>orderNumRows('date')} >
              Fecha
            </th>
            <th>
              Operario
            </th>
          </tr>
        </thead>
        <tbody>
          {dataInputsFiltred.reverse().map((inp,index) => {
            return(
              <Fragment key={index}>
                <tr className={styles.view} >
                  <td>
                    {inp.celda}
                  </td>
                  <td>
                    {inp.producto}
                  </td>
                  <td>
                    {inp.motivo}
                  </td>
                  <td>
                    {inp.insumo}
                  </td>
                  <td>
                    {inp.cantidad}
                  </td>
                  <td>
                    {inp.descripcion}
                  </td>
                  <td>
                    {inp.time}
                  </td>
                  <td>
                    {inp.date}
                  </td>
                  <td>
                    {inp.lider}
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
export default TablasArmado