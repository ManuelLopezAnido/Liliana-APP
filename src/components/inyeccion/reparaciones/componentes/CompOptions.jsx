import { faCheckCircle, faEye, faScrewdriverWrench, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from '../css/CompOptions.module.css'
export const Options = ({ liderUser }) => {
    return (
        <>
            <div className={styles.txtColors}>
                <b>COLORES:</b>
                <div className={styles.colores}>
                    <div className={styles.coloresTable}>
                        <div className={styles.rojo}></div>
                        <p>CREADO</p>
                        <div className={styles.verde}></div>
                        <p>REPARADO</p>
                    </div>
                    <div className={styles.coloresTable}>
                        <div className={styles.amarillo}></div>
                        <p>NOTIFICADO</p>

                        <div className={styles.azul}></div>
                        <p>VERIFICADO</p>
                    </div>
                </div>
            </div>
            {liderUser !== null && (
                <div className={styles.txtOptions}>
                    <b>Opciones:</b>
                    <div className={styles.colores}>
                        <div className={styles.coloresTable}>
                            <div>
                                <FontAwesomeIcon className={styles.linkMedia} icon={faEye} />
                            </div>
                            <p>NOTIFICAR</p>
                            <div>
                                <FontAwesomeIcon
                                    className={styles.linkMedia}
                                    icon={faScrewdriverWrench}
                                />
                            </div>
                            <p>REPARAR</p>
                        </div>
                        <div className={styles.coloresTable}>
                            <div>
                                <FontAwesomeIcon className={styles.linkMedia} icon={faCheckCircle} />
                            </div>
                            <p>VERIFICAR</p>
                            <div>
                                <FontAwesomeIcon className={styles.linkMedia} icon={faTrash} />
                            </div>
                            <p>BORRAR</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
