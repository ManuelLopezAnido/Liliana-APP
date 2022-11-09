import { useState } from 'react';

export const useOptions = () => {
  const [stateModal, setStateModal] = useState(false);
  const [stateModalDelete, setStateModalDelete] = useState(false);

  let datos = {
    id: '',
    fechaCreado: '',
    horaCreado: '',
    lider: '',
    descripcion: '',
    fechaVisualizado: '',
    horaVisualizado: '',
    recibe: '',
    fechaReparado: '',
    horaReparado: '',
    repara: '',
    observacionesReparar: '',
    fechaVerificado: '',
    horaVerificado: '',
    observacionesVerificar: '',
    estado: '',
  };

  const [dataModal, setDataModal] = useState(datos);
  const [dataModalDelete, setDataModalDelete] = useState('');

  const modal = (dataTable) => {
    setStateModal(!stateModal);

    if (dataTable.maquinas) {
      datos.maquina = dataTable.maquinas;
    } else {
      datos.molde = dataTable.moldes;
    }

    setDataModal(dataTable);
  };
  const modalDelete = (dataTable) => {
    setDataModalDelete(dataTable);
    setStateModalDelete(!stateModalDelete);
  };
  const deleteSession = () => {
    sessionStorage.removeItem('InyeccionUser');
  };

  return {
    dataModal,
    modal,
    stateModal,
    setStateModal,
    deleteSession,
    stateModalDelete,
    setStateModalDelete,
    modalDelete,
    dataModalDelete,
  };
};
