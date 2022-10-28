import {
  Boton,
  ContenedorBotonCentrado,
  ContenedorModalDenegar,
  EncabezadoModal,
  Overlay,
} from '../styledComponents';
import { CompInput } from './CompInput';
import { CompMessage } from './CompMessage';
import styles from '../css/CompDenegado.module.css'
export const CompDenegado = ({
  state,
  setState,
  send,
  denegar,
  setDenegar,
  formValidate,
  setFormValidate,
}) => {
  const expresiones = {
    mensaje: /^[a-zA-Z0-9À-ÿ\s^.,]{3,200}$/,
  };

  return (
    <>
      {state && (
        <Overlay>
          <ContenedorModalDenegar>
            <EncabezadoModal>
              <h1>Orden denegada: Motivo</h1>
              <span className={styles.spanConfirm}>
                (ATENCION: Se enviara un correo a los respectivos lideres y
                supervisores)
              </span>
            </EncabezadoModal>
            <>
              <CompInput
                InputState={denegar}
                InputSetState={setDenegar}
                inputType='text'
                inputPlaceholder='Motivo'
                inputName='motivoDenegado'
                inputError='El motivo de denegacion tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo.'
                inputExp={expresiones.mensaje}
              />
            </>
            <CompMessage verif={formValidate} />
            <ContenedorBotonCentrado>
              <Boton
                onClick={() => {
                  setDenegar({ campo: '', valido: null });
                  setState(!state);
                  setFormValidate(null);
                }}
              >
                Cerrar
              </Boton>
              <Boton type='submit' onClick={send} validate='valid'>
                Enviar
              </Boton>
            </ContenedorBotonCentrado>
          </ContenedorModalDenegar>
        </Overlay>
      )}
    </>
  );
};
