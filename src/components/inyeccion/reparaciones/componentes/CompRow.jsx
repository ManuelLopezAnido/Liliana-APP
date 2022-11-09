import {
  faCheckCircle,
  faEye,
  faPlus,
  faScrewdriverWrench,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { DivOpciones, TR } from '../styledComponents';
import styles from '../css/CompRow.module.css';
export const CompRow = ({ dataTable, liderSesion, modal, modalDelete }) => {
  return (
    <TR className={styles.tr} validate={dataTable.estado}>
      <td data-label='Fecha y hora creado'>
        {dataTable.fechaCreado}
        <hr className={styles.hr} />
        {dataTable.horaCreado}
      </td>
      {dataTable.maquina ? (
        <td data-label='Maquinas'>{dataTable.maquina}</td>
      ) : (
        <td data-label='Moldes'>{dataTable.molde}</td>
      )}

      <td data-label='Lider que creo la orden'>{dataTable.lider}</td>
      <td data-label='Problema'>{dataTable.problema}</td>
      <td data-label='Fecha y hora notificado'>
        {dataTable.fechaNotificado}
        <hr className={styles.hr} />
        {dataTable.horaNotificado}
      </td>
      <td data-label='Fecha y hora reparado'>
        {dataTable.fechaReparado}
        <hr className={styles.hr} />
        {dataTable.horaReparado}
      </td>
      <td data-label='Fecha y hora verificacion'>
        {dataTable.fechaVerificado}
        <hr className={styles.hr} />
        {dataTable.horaVerificado}
      </td>
      <td data-label='Opciones'>
        <DivOpciones validate={dataTable.estado}>
          {dataTable.molde ? (
            <>
              {liderSesion !== null ? (
                <>
                  <Link
                    to={`/inyeccion/moldes/notificar/${dataTable.id}`}
                    title='Notificar'
                  >
                    <FontAwesomeIcon
                      className={styles.linkMedia}
                      icon={faEye}
                    />
                  </Link>

                  <Link
                    to={`/inyeccion/moldes/reparar/${dataTable.id}`}
                    title='Reparar'
                  >
                    <FontAwesomeIcon
                      className={styles.linkMedia}
                      icon={faScrewdriverWrench}
                    />
                  </Link>
                  <Link
                    to={`/inyeccion/moldes/verificar/${dataTable.id}`}
                    title='Verificar'
                  >
                    <FontAwesomeIcon
                      className={styles.linkMedia}
                      icon={faCheckCircle}
                    />
                  </Link>
                </>
              ) : (
                <>
                  <div></div>
                </>
              )}
            </>
          ) : (
            <>
              {liderSesion !== null ? (
                <>
                  <Link
                    to={`/inyeccion/maquinas/notificar/${dataTable.id}`}
                    title='Notificar'
                  >
                    <FontAwesomeIcon
                      className={styles.linkMedia}
                      icon={faEye}
                    />
                  </Link>

                  <Link
                    to={`/inyeccion/maquinas/reparar/${dataTable.id}`}
                    title='Reparar'
                  >
                    <FontAwesomeIcon
                      className={styles.linkMedia}
                      icon={faScrewdriverWrench}
                    />
                  </Link>
                  <Link
                    to={`/inyeccion/maquinas/verificar/${dataTable.id}`}
                    title='Verificar'
                  >
                    <FontAwesomeIcon
                      className={styles.linkMedia}
                      icon={faCheckCircle}
                    />
                  </Link>
                </>
              ) : (
                <>
                  <div></div>
                </>
              )}
            </>
          )}

          {dataTable.estado !== 'creado' ||
          dataTable.primerMotivoDenegado ||
          dataTable.segundoMotivoDenegado ? (
            <></>
          ) : liderSesion === dataTable.lider ? (
            <button
              onClick={() => modalDelete(dataTable)}
              className={styles.btnTable}
              title='Borrar orden'
            >
              <FontAwesomeIcon className={styles.linkMedia} icon={faTrash} />
            </button>
          ) : (
            <></>
          )}

          <button
            onClick={() => modal(dataTable)}
            className={styles.btnTable}
            title='Abrir orden completa'
          >
            <FontAwesomeIcon className={styles.linkMedia} icon={faPlus} />
          </button>
          {liderSesion === null && <div></div>}
        </DivOpciones>
      </td>
      <td data-label='Estado'>
        <>
          {dataTable.estado.toUpperCase()}
          {dataTable.primerMotivoDenegado && (
            <>
              <hr className={styles.hr} />
              <p className={styles.p}>(Denegada)</p>
            </>
          )}
        </>
      </td>
      <td data-label='Categoria'>{dataTable.categoria}</td>
    </TR>
  );
};
