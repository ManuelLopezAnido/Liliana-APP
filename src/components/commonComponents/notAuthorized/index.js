import styles from './notAuthorized.module.css'


const NotAuthorized = ()=>{
  
  return(
    <div>
      <div className={styles.App}>
        <div className={styles.title}>
          NO AUTORIZADO
        </div>
        <div className={styles.wrapper}>
        <svg xmlns="http://www.w3.org/2000/svg" id="robot-error" viewBox="0 0 260 118.9" >
          <defs>
            <circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="20" />
            <text id="text-s" className={styles.errorText} y="106"> 403 </text>
          </defs>
          <path className={styles.alarm} fill="" d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6" />
          <use href="#text-s" x="-0.5px" y="-1px" fill="black"></use>
          <use href="#text-s" fill="#61DAFB"></use>
          <g id="robot">
            <g className={styles.eyewrap}>
              <use href="#white-eye"></use>
              <circle id="eyef" className={styles.eye} fill="#000" stroke="#804000" strokeWidth="2" strokeMiterlimit="10" cx="130" cy="65" r="11" />
              <ellipse id="white-eye" fill="#61DAFB" cx="130" cy="40" rx="18" ry="12" />
            </g>
            <circle className={styles.lightblue} cx="105" cy="32" r="2.5" id="tornillo" />
            <use href="#tornillo" x="50"></use>
            <use href="#tornillo" x="50" y="60"></use>
            <use href="#tornillo" y="60"></use>
          </g>
        </svg>
        <p className={styles.text}>Disculpe, no tiene permisos para ingresar a esta area</p>
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
