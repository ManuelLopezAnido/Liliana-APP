import { BotonInicio, ContenedorBotonCentrado } from "../styledComponents"
import styles from '../css/ButtonSesion.module.css'
export const ButtonSesion = ({ liderUser, deleteSession }) => {
    return (
        <ContenedorBotonCentrado>
            {liderUser !== null && (
                <div>
                    <BotonInicio
                        type='submit'
                        onClick={deleteSession}
                        validate='denied'
                    >
                        <a
                            className={styles.noStyle}
                            href='http://192.168.11.139:3001/inyeccion'
                        >
                            Cerrar Sesion
                        </a>
                    </BotonInicio>
                </div>
            )}

            <a href='http://192.168.11.139:3001/inyeccion'>
                {liderUser !== null ? (
                    <BotonInicio type='submit'>Atras</BotonInicio>
                ) : (
                    <BotonInicio type='submit' validate='valid'>
                        Iniciar sesion
                    </BotonInicio>
                )}
            </a>
        </ContenedorBotonCentrado>
    )
}

