import styles from './modalOk.module.css'
const ModalOk = ()=>{
  return(
    <div 
    className={styles.modalFade} 
    id="exampleModal" 
    tabIndex="-1" 
    role="dialog" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true">
      <div className={styles.modaldialog} role="document">
      <div className={styles.modalheader}>
        <span class="dialog__close">&#x2715;</span>
      </div>
       <div className={styles.modalcontent}>
          imagen
        </div>
        <button className={styles.modalbutton}>Aceptar &#8594;</button>
      </div>
    </div>
  )
}
export default ModalOk