import { useEffect, useState } from 'react';
import axios from 'axios';
import { CompModal, Options, Table, ButtonSesion } from '../componentes';
import { useOptions } from '../hooks';
import styles from '../css/CompTablesInyectorasMatriceria.module.css';
import { CompConfirmDelete } from '../componentes/CompConfirmDelete';
import { DivContainer } from '../styledComponents';
const URI = 'http://192.168.11.139:4001/api/procesos/forms/maquinas';

export const CompTableInyectoras = () => {
  const [data, setData] = useState([]);
  const {
    dataModal,
    modal,
    stateModal,
    setStateModal,
    deleteSession,
    stateModalDelete,
    setStateModalDelete,
    modalDelete,
    dataModalDelete,
  } = useOptions();
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

  const deleteRow = async () => {
    try {
      await axios.delete(URI + '/' + dataModalDelete.id);
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
    if (categoriaA > categoriaB) {
      return -1;
    } else {
      if (creadoA > creadoB) {
        return -1;
      }
    }

    return 0;
  });

  return (
    <DivContainer>
      <CompModal
        state={stateModal}
        setState={setStateModal}
        dataTable={dataModal}
      />

      <CompConfirmDelete
        stateModalDelete={stateModalDelete}
        setStateModalDelete={setStateModalDelete}
        deleteRow={deleteRow}
      />

      <h1 className={styles.titleTop}>
        TABLA DE ORDENES DE REPARACION (MANTENIMIENTO INYECTORAS)
      </h1>

      <Options liderUser={liderUser} />

      <ButtonSesion
        liderUser={liderUser}
        deleteSession={deleteSession}
        data={data}
        table='maquinas'
      />

      <Table
        data={data}
        liderUser={liderUser}
        modalDelete={modalDelete}
        modal={modal}
        table='maquinas'
      />
    </DivContainer>
  );
};
