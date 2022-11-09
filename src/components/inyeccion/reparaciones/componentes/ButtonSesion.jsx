import {
  BotonInicio,
  BotonInicioTabla,
  ContenedorBotonCentrado,
  ContenedorBotonInicio,
} from '../styledComponents';
import styles from '../css/ButtonSesion.module.css';
export const ButtonSesion = ({ liderUser, deleteSession, data, table }) => {
  return (
    <ContenedorBotonCentrado>
      {liderUser !== null && (
        <div>
          <BotonInicio type='submit' onClick={deleteSession} validate='denied'>
            <a
              className={styles.noStyle}
              href='http://192.168.11.139:3001/inyeccion'
            >
              Cerrar Sesion
            </a>
          </BotonInicio>
        </div>
      )}

      {liderUser !== null && (
        <>
          {table === 'maquinas' ? (
            <a className={styles.noStyle} href='/inyeccion/maquinas/crear'>
              <ContenedorBotonInicio>
                <BotonInicioTabla type='submit' validate='valid'>
                  Crear orden de reparacion: Mantenimiento Inyectoras
                </BotonInicioTabla>
              </ContenedorBotonInicio>
            </a>
          ) : (
            <a className={styles.noStyle} href='/inyeccion/moldes/crear'>
              <ContenedorBotonInicio>
                <BotonInicioTabla type='submit' validate='valid'>
                  Crear orden de reparacion: Moldes
                </BotonInicioTabla>
              </ContenedorBotonInicio>
            </a>
          )}
        </>
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
  );
};
