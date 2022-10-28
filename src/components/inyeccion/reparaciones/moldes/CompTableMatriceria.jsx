import { useEffect, useState } from 'react';
import {
  BotonInicioTabla,
  ContenedorBotonInicio,
} from '../styledComponents';
import axios from 'axios';
import { CompModal, Options, Table, ButtonSesion } from '../componentes';
import { useOptions } from '../hooks';
import styles from '../css/CompTablesInyectorasMatriceria.module.css'
const URI = 'http://192.168.11.139:4001/api/procesos/forms/moldes';

export const CompTableMatriceria = () => {
  const [data, setData] = useState([]);
  const { dataModal, modal, stateModal, setStateModal, deleteSession } =
    useOptions();
  useEffect(() => {
    getData();
  }, []);
  const liderUser = sessionStorage.getItem('InyeccionUser');

  const getData = async () => {
    try {
      const res = await axios.get(URI);
      setData(res.data);
    } catch (error) {
      console.log(error);
      alert(
        'BASE DE DATOS NO RESPONDE O SE ENCUENTRA APAGADA, POR FAVOR COMUNICARSE CON EL AREA'
      );
    }
    setInterval(() => {
      window.location.reload();
    }, 600000);
  };

  const deleteRow = async (dataTable) => {
    try {
      await axios.delete(URI + '/' + dataTable.id);
      window.location.reload();
    } catch (error) {
      alert('No se pudo eliminar la orden');
    }
  };

  data.sort((a, b) => {
    const creadoA = a.fechaCreado + a.horaCreado;
    const creadoB = b.fechaCreado + b.horaCreado;

    const categoriaA = a.categoria;
    const categoriaB = b.categoria;

    const verificadoA = a.horaVerificado + a.horaVerificado;

    if (verificadoA) {
      return 1;
    }
    if (creadoA > creadoB) {
      return -1;
    } else {
      if (categoriaA > categoriaB) {
        return -1;
      }
    }

    return 0;
  });

  return (
    <>
      <CompModal
        state={stateModal}
        setState={setStateModal}
        dataTable={dataModal}
      />
      <h1 className={styles.titleTop}>TABLA DE ORDENES DE REPARACION (MATRICERIA)</h1>

      <Options liderUser={liderUser} />

      <ButtonSesion liderUser={liderUser} deleteSession={deleteSession} />

      <Table
        data={data}
        liderUser={liderUser}
        deleteRow={deleteRow}
        modal={modal}
      />

      <div className={styles.noStyleDiv}>
        {liderUser !== null && (
          <a className={styles.noStyle} href='/inyeccion/moldes/create'>
            <ContenedorBotonInicio>
              <BotonInicioTabla type='submit' validate='valid'>
                Crear orden de reparacion: Matriceria
              </BotonInicioTabla>
            </ContenedorBotonInicio>
          </a>
        )}
      </div>
    </>
  );
};
