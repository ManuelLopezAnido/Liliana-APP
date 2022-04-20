import styles from './armado.module.css'
const InputArmado = ()=>{
  return(
    <>
      <form className={styles.depositForm} action="submeter-formulario.php" method="post">
        <div className={styles.segment}>
          <h1>Relevamiento</h1>
        </div>
        <section className={styles.section}>
          <p>Los campos obligatorios contienen <strong><abbr title="required">*</abbr></strong></p>
          
          <fieldset className={styles.fieldset}>
            <legend>Motivo<strong><abbr title="required">*</abbr></strong></legend>
            <ul className={styles.ul}>
                  <div>
                    <label for="mot1">
                      <input type="radio" id="mot1" name="title" value="K"/>
                      Reproceso
                    </label>
                    <label for="mot2">
                      <input type="radio" id="mot2" name="title" value="N"/>
                      Incompleto
                    </label>
                  </div>
                  <div>
                    <label for="mot3">
                      <input type="radio" id="mot3" name="title" value="Q"/>
                      Defecto superficial
                    </label>
                    <label for="mot4">
                      <input type="radio" id="mot4" name="title" value="S"/>
                      Otros
                    </label>
                  </div>
                  <div>
                    <label for="mot5">
                      <input type="radio" id="mot5" name="title" value="J"/>
                      Funcionamiento
                    </label>
                  </div>
                  <div>
                    <label for="mot6">
                      <input type="radio" id="mot6" name="title" value="L"/>
                      Faltante de pz plástica
                    </label>
                  </div>
                  <div>
                    <label for="mot7">
                      <input type="radio" id="mot7" name="title" value="M"/>
                        Ausentismo
                    </label>
                  </div>
            </ul>
          </fieldset>
          <p>
            <div className={styles.div}>
              <label for="select1">Sector</label>
              <select className={styles.select} >
                <option disabled selected="">Seleccione sector</option>"
                <option>Armado 1</option>
                <option>Armado 2</option>
                <option>Armado 3</option>
                <option>Armado 4</option>
              </select>
            </div>
          </p>
          <p>
            <div className={styles.div}>
              <label for="select2">Líder<strong><abbr title="required">*</abbr></strong></label>
              <select className={styles.select} >
                <option disabled selected=""> Seleccione su nombre</option>"
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
            </div>
          </p>
          <p className={styles.p}>
              <label for="codigo">
                <span>Código producto<strong><abbr title="required">*</abbr></strong></span>
              </label>
              <input type="text" className={styles.cod} name="codigo"/>
          </p>
          <p className={styles.p}>
            <label for="insumo">
              <span>Insumo faltante<strong><abbr title="required">*</abbr></strong></span>
            </label>
            <input type="text" className={styles.p} name="insumo"/>
          </p>
          <p className={styles.p}>
            <label for="descripcion">Descripción</label>
            <textarea className={styles.textarea} name="descripcion"></textarea>
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.h2}>
            <button type="submit" className={styles.button}>Relevar información</button>
          </h2>
          <p>
          </p>
        </section>
      </form>
    </>
  )
}
export default InputArmado