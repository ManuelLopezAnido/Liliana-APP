import {
  faCheck,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MensajeError, MensajeExito } from '../styledComponents';

export const CompMessage = ({ verif }) => {
  return (
    <>
      {verif === false && (
        <MensajeError>
          <span>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <b>Error:</b> Por favor rellene el formulario correctamente.
          </span>
        </MensajeError>
      )}

      {verif === true && (
        <MensajeExito>
          <span>
            <FontAwesomeIcon icon={faCheck} />
            <b>Exito:</b> Formulario enviado exitosamente!
          </span>
        </MensajeExito>
      )}
    </>
  );
};
