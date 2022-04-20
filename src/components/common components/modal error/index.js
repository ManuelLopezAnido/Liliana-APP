import styles from './modalError.module.css'
 import cruz from './cruz error.png'
const ModalError = (props)=>{
 
  return(
    <div 
    className={props.errorMsg ? styles.modalFade : styles.modalHidden} 
    id="exampleModal" 
    tabIndex="-1" 
    role="dialog" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true">
      <div className={styles.modaldialog} role="document">
        <div className={styles.modalheader}>
          <p className={styles.title} >Error</p>  
          <img src={cruz} className={styles.tilde} alt="tilde" />  
        </div>
        <div className={styles.modalclose}>
          <span onClick={props.close}>&#x2715;</span>
        </div>
        <div className={styles.modalcontent}>
          {props.errorMsg}
          <br/>
          Por favor notificar del error al area PCP
        </div>
          <button className={styles.modalbutton} onClick={props.close}>Aceptar &#8594;</button>
        </div>
    </div>
  )
}
export default ModalError