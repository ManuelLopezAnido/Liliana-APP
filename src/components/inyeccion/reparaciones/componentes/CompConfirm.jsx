import {
  Boton,
  ContenedorBotonCentrado,
  ContenedorModalConfirmar,
  EncabezadoModal,
  OrdenReparacionConfirmar,
  Overlay,
} from '../styledComponents';
import styles from '../css/CompConfirm.module.css';
export const CompConfirm = ({ dataTable, state, setState, send }) => {
  return (
    <>
      {state && (
        <Overlay>
          <ContenedorModalConfirmar>
            <EncabezadoModal>
              <h1>Confirmar datos:</h1>
              <span className={styles.spanConfirm}>
                (ATENCION: Se enviara un correo a los respectivos lideres y
                supervisores)
              </span>
            </EncabezadoModal>
            <OrdenReparacionConfirmar>
              <h4>Categoria:</h4>
              <h5 className={styles.h5}>{dataTable.categoria}</h5>
              <div>
                <section>
                  <h4>Fecha Creacion:</h4>
                  <h5>{dataTable.fechaCreado}</h5>
                  <h4>Creado por:</h4>
                  <h5>{dataTable.lider}</h5>
                </section>
                <section>
                  <h4>Hora Creacion:</h4>
                  <h5>{dataTable.horaCreado}</h5>
                  {dataTable.molde ? (
                    <>
                      <h4>Molde u otro periferico:</h4>
                      <h5>{dataTable.molde}</h5>
                    </>
                  ) : (
                    <>
                      <h4>Maquina:</h4>
                      <h5>{dataTable.maquina}</h5>
                    </>
                  )}
                </section>
              </div>

              <h4>Descripcion:</h4>
              <h5>{dataTable.problema}</h5>
            </OrdenReparacionConfirmar>
            <ContenedorBotonCentrado>
              <Boton onClick={() => setState(!state)}>Cerrar</Boton>
              <Boton type='submit' onClick={send} validate='valid'>
                Enviar
              </Boton>
            </ContenedorBotonCentrado>
          </ContenedorModalConfirmar>
        </Overlay>
      )}
    </>
  );
};
