import { CompRow } from './CompRow';
import styles from '../css/CompTable.module.css';

export const Table = ({ data, liderUser, modal, modalDelete, table }) => {
  return (
    <table className={styles.tableFill}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}>Fecha y hora creado</th>
          {table === 'maquinas' ? (
            <th className={styles.th}>Maquinas</th>
          ) : (
            <th className={styles.th}>Moldes</th>
          )}
          <th className={styles.th}>Lider que creo la orden</th>
          <th className={styles.th}>Problema</th>
          <th className={styles.th}>Fecha y hora notificado</th>
          <th className={styles.th}>Fecha y hora reparado</th>
          <th className={styles.th}>Fecha y hora verificacion</th>
          <th className={styles.th}>Opciones</th>
          <th className={styles.th}>Estado</th>
          <th className={styles.th}>Categoria</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((dataTable) => (
          <CompRow
            key={dataTable.id}
            dataTable={dataTable}
            liderSesion={liderUser}
            modal={modal}
            modalDelete={modalDelete}
          />
        ))}
      </tbody>
    </table>
  );
};
