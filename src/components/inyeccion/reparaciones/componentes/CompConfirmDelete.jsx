import {
  Boton,
  ContenedorBotonCentrado,
  ContenedorModalBorrar,
  EncabezadoModal,
  Overlay,
} from '../styledComponents';

export const CompConfirmDelete = ({
  deleteRow,
  setStateModalDelete,
  stateModalDelete,
}) => {
  return (
    <>
      {stateModalDelete && (
        <Overlay>
          <ContenedorModalBorrar>
            <EncabezadoModal>
              <h1>Desea borrar la orden?</h1>
            </EncabezadoModal>

            <ContenedorBotonCentrado>
              <Boton onClick={() => setStateModalDelete(!stateModalDelete)}>
                Cerrar
              </Boton>
              <Boton type='submit' onClick={deleteRow} validate='valid'>
                Aceptar
              </Boton>
            </ContenedorBotonCentrado>
          </ContenedorModalBorrar>
        </Overlay>
      )}
    </>
  );
};
