import styles from './modalOk.module.css'
import tilde from './tilde verde.png'
const ModalOk = (props)=>{
 
  return(
    <div 
    className={props.show ? styles.modalFade : styles.modalHidden} 
    id="exampleModal" 
    tabIndex="-1" 
    role="dialog" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true">
      <div className={styles.modaldialog} role="document">
        <div className={styles.modalheader}>
          <p className={styles.title} >Exito</p>  
          <img src={tilde} className={styles.tilde} alt="tilde" />  
        </div>
        <div className={styles.modalclose}>
          <span onClick={props.close}>&#x2715;</span>
        </div>
        <div className={styles.modalcontent}>
          {props.message}
        </div>
          <button className={styles.modalbutton} onClick={props.close}>Aceptar &#8594;</button>
        </div>
    </div>
  )
}
export default ModalOk