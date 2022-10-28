import { CompRow } from "./CompRow"
import styles from '../css/CompTable.module.css'

export const Table = ({ data, liderUser, modal, deleteRow }) => {
    return (
        <table className={styles.tableFill}>
            <thead>
                <tr>
                    <th>Fecha y hora creado</th>
                    {data.maquinas ?
                        <th>Maquinas</th>
                        :
                        <th>Moldes</th>
                    }
                    <th>Lider que creo la orden</th>
                    <th>Problema</th>
                    <th>Fecha y hora notificado</th>
                    <th>Fecha y hora reparado</th>
                    <th>Fecha y hora verificacion</th>
                    <th>Opciones</th>
                    <th>Estado</th>
                    <th>Categoria</th>
                </tr>
            </thead>
            <tbody>
                {data.map((dataTable) => (
                    <CompRow
                        key={dataTable.id}
                        dataTable={dataTable}
                        liderSesion={liderUser}
                        modal={modal}
                        deleteRow={deleteRow}
                    />
                ))}
            </tbody>
        </table>
    )
}
