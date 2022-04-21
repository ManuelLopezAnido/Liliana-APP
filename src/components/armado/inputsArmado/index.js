import styles from './inputsarmado.module.css'
const InputArmado = ()=>{
  return(
    <>
      <form className={styles.armadoForm}>
        <div className={styles.segment}>
          <h1>Relevamiento</h1>
        </div>
        <label >
          <select className={styles.select} >
            <option disabled value="">Seleccione sector</option>"
            <option>Armado 1</option>
            <option>Armado 2</option>
            <option>Armado 3</option>
            <option>Armado 4</option>
          </select>
        </label>
        <label >
          <select className={styles.select} >
            <option disabled value=""> Seleccione su nombre</option>"
            <optgroup label="Armado 1"/>
              <option>AUYEROS, CRISTIAN LEONARDO</option>
              <option>BATTISTELLI, MARCOS</option>
              <option>CABRERA, MARIANO</option>
              <option>DELGADO, RICARDO</option>
              <option>GAMARRA, JONATAN</option>
              <option>MEDINA BENITEZ, JOSE</option>
              <option>MONZON, AYELEN MARIBEL</option>
              <option>ARGAÑARAS, LEANDRO RODRIGO</option>
              <option>ROBLEDO, PATRICIO</option>
              <option>SARMIENTO, BRIAN EZEQUIEL</option>
              <option>GONZALEZ, WALTER DAVID </option>
              <optgroup label="Armado 2"/>
              <option>ARGAÑARAS, LEANDRO RODRIGO</option>
              <option>ROBLEDO, PATRICIO</option>
              <option>SAUCEDO, NESTOR</option>
              <option>SCHOENFELD, LUCIANO ADRIAN</option>
              <option>SEGOVIA, ARIEL</option>
              <option>SAUCEDO, HUGO HECTOR</option>
              <option>SARMIENTO, BRIAN EZEQUIEL</option>
              <option>MONZON, AYELEN MARIBEL</option>
              <option>GAMARRA, JONATAN</option>
              <optgroup label="Armado 3"/>
              <option>CORREA, OSCAR NICOLAS</option>
              <option>GOMEZ, ISAIAS MAXIMILIANO</option>
              <option>LEZCANO, FABIAN GASTON</option>
              <option>CARDOZO, VICTOR EMANUEL</option>
              <option>PEDERNERA, LUIS OMAR</option>
              <optgroup label="Armado 4"/>
              <option>VICICH, FERNANDO MARTIN</option>
              <option>GARCIA, FEDERICO</option>
              <option>LEDESMA, CLAUDIO ANDRES</option>
              <option>JAUME, LUCAS DARIO</option>
              <option>MENDOZA, CARLOS FERNANDO</option>
              <option>ZALAZAR, JONATAN MATIAS</option>
            </select>
        </label>
        <label >
          <span>Código producto<strong><abbr title="required">*</abbr></strong></span>
          <input type="text" className={styles.cod} name="codigo"/>
        </label>
        <label>
          <span>Insumo faltante<strong><abbr title="required">*</abbr></strong></span>
          <input type="text" className={styles.p} name="insumo"/>
        </label>
        <label>
          <textarea className={styles.textarea} name="descripcion"></textarea>
        </label>
        <button type="submit" className={styles.button}>Relevar información</button>
      </form>
    </>
  )
}
export default InputArmado