import styles from './criticosAbastecimiento.module.css'
import { useState, useEffect } from 'react'
import { Fragment } from 'react'
const TablasAbastecimiento =() =>{
  const [dataAbs, setDataAbs] = useState([])
  const [piezas, setPiezas] = useState([])
  const [piezasFiltred , setPiezasFiltred] = useState ([])
  const [inputs, setInputs] = useState({})
  const [pzGreaterZero, setPzGreaterZero] = useState ([])
  const [greaterZero, setGreaterZero] = useState(false)
  const [cantPallets, setCantPallets] = useState(0)
  const fetchingPiezas = ()=>{
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/data/piezas/abastecimiento')
      .then((res)=>res.json())
      .then ((json)=>{
        setPiezas([...json])
        setPiezasFiltred ([...json])
      })
      .catch (err => console.log(err))
  }

  const fetchingTable = ()=>{
    fetch('http://192.168.11.139'+ process.env.REACT_APP_PORTS +'/api/abastecimiento/tables')
      .then((res)=>res.json())
      .then ((json)=>{
        setDataAbs (json)
      })
      .catch (err => console.log(err))
  }
  console.log('piezas',piezas)
  useEffect (()=>{
    fetchingTable()
    fetchingPiezas()
  },[])
 
  const cantPz=(pz)=>{
    const tot = dataAbs.reduce((prev,curr) => {
      return (
        prev + curr.supplies?.reduce((prev2,curr2) => {
          if (curr2.code === pz){
            return(
              prev2 + curr2.amount
            )
          } else {
            return(prev2)
          }
        },0)
      )
    },0)
    return(tot)
  }
  const cantidadPallets = ()=>{
    let cantPallet = piezasFiltred.reduce((acc, curr)=>{
      let pallets = Math.floor((cantPz(curr.code)-curr.stockMin)/curr.inPallets)
      if (pallets < 0){
        return (acc - pallets) // is a rest cause pallets are negative
      } else {
        return acc
      }
    },0)
    setCantPallets(cantPallet)
  }

  const filterGreaterZero = () =>{
    let bool = !greaterZero
    setGreaterZero(bool)
    if (bool){
      let pzFiltred = piezas.filter((pz)=>{
        return cantPz(pz.code)
      })
      setPzGreaterZero (pzFiltred)
      setPiezasFiltred(pzFiltred)
    } else {
      setPiezasFiltred(piezas)
    }
  }
  const handleFilters = (e) => {
    const name = e.target.name
    const value = e.target.value.toUpperCase()
    setInputs({...inputs, [name]: value})
    let pzFiltred
    if (greaterZero){
      pzFiltred = pzGreaterZero.filter((pz)=>{
        return(pz.code.includes(value))
      })
    } else {
      pzFiltred = piezas.filter((pz)=>{
        return(pz.code.includes(value))
      })
    }
    setPiezasFiltred(pzFiltred)
  }
 
  return(
  <>
    <div className={styles.filter}>
      <form className={styles.depositForm}>
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
            onChange={handleFilters} 
            placeholder="Código de insumo"/>
        </label>
      </form>
      <button
        className={styles.reloadButton}
        onClick={()=>filterGreaterZero()}>
        <span className={`${styles.greaterZero} ${greaterZero ? styles.zeroActive : ''}`}>0+</span>
      </button>
      <button 
        className={styles.reloadButton}
        onClick={()=>{
          fetchingTable()
          setPiezasFiltred(piezas)
          }
        }>
        <span className={styles.reload}>&#x21bb;</span>
      </button>
    </div>
    <div className={styles.pallets}>
      <div>
        Pallets faltantes: 
      </div>
      <span>
        {cantPallets + ' -'}
      </span>
      <span
      className={styles.act}
      onClick = {cantidadPallets}
      >
        Actualizar
      </span>
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
          {piezasFiltred?.map((pz,index) => {
            let cant=cantPz(pz.code)
            return(
              <Fragment key={index}>
                <tr className={styles.view} >
                  <td>
                    {pz.code}
                  </td>
                  <td>
                    {pz.description}
                  </td>
                  <td>
                    {pz.family}
                  </td>
                  <td>
                    {cant}
                  </td>
                  <td>
                    {pz.stockMin}
                  </td>
                  <td>
                    {pz.stockMin ? Math.round(cant*100/pz.stockMin) + '%' : '-'}
                  </td>
                  <td>
                    {pz.inPallets ? Math.floor((cant-pz.stockMin)/pz.inPallets) : '-'}
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