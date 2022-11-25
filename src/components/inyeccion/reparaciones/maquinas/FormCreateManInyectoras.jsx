import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  BotonInicio,
  Label,
} from '../styledComponents';
import axios from 'axios';
import { useDate, useInputs } from '../hooks';
import { CompMessage, CompInput, CompDate, CompConfirm } from '../componentes';
import styles from '../css/FormCreate.module.css';
const URI = 'http://192.168.11.139:4001/api/procesos/forms/maquinas';
//const URIEmails = 'http://192.168.11.139:4001/api/sendEmails/send/maquinas';

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export const FormCreateInyectoras = () => {
  const {
    maquinas,
    setMaquinas,
    messageMaquinas,
    setMessageMaquinas,
    expresiones,
  } = useInputs();

  const [formValidate, setFormValidate] = useState(null);
  const { date, hour, dia, mes, year, hora, min } = useDate();
  const LiderUser = sessionStorage.getItem('InyeccionUser');
  const [stateModal, setStateModal] = useState(false);
  const [radio, setRadio] = useState({
    checked: 'Mejora',
  });
  const [dataModal, setDataModal] = useState({
    fechaCreado: '',
    horaCreado: '',
    maquinas: '',
    lider: '',
    problema: '',
  });

  const changeButton = (e) => {
    setRadio({ checked: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (maquinas.valido === 'true' && messageMaquinas.valido === 'true') {
      setStateModal(!stateModal);
      setDataModal({
        fechaCreado: date,
        horaCreado: hour,
        maquina: maquinas.campo,
        lider: LiderUser,
        problema: messageMaquinas.campo,
        categoria: radio.checked,
      });
    } else {
      setTimeout(() => {
        setFormValidate(null)
      }, 2000)
      setFormValidate(false)
    }
  };
  const sendData = async () => {
    console.log('Se mando correctamente');
    setStateModal(!stateModal);
    setFormValidate(true);
    let id = maquinas.campo + year + mes + dia + hora + min;
    await axios.post(URI, {
      id: id,
      fechaCreado: date,
      horaCreado: hour,
      maquina: maquinas.campo,
      lider: LiderUser,
      problema: messageMaquinas.campo,

      fechaNotificado: '',
      horaNotificado: '',
      notificado: '',

      fechaReparado: '',
      horaReparado: '',
      repara: '',
      observacionesReparar: '',

      fechaVerificado: '',
      horaVerificado: '',
      verifica: '',
      observacionesVerificar: '',

      estado: 'creado',
      categoria: radio.checked,
    });

    // await axios.post(URIEmails, {
    //   message:
    //     'El dia ' +
    //     date +
    //     ' a las ' +
    //     hour +
    //     ' se genero una orden de reparacion para la maquina u periferico ' +
    //     maquinas.campo +
    //     ' con el siguiente problema ' +
    //     messageMaquinas.campo +
    //     '. Fue creada por ' +
    //     LiderUser +
    //     ' y es de caracter ' +
    //     radio.checked +
    //     '. El ID de la orden es ' +
    //     id +
    //     '.',
    // });

    setMaquinas({ campo: '', valido: '' });
    setMessageMaquinas({ campo: '', valido: null });

    await timeout(1500);
    window.location.replace('/inyeccion/maquinas');
  };

  return (
    <>
      <CompConfirm
        state={stateModal}
        setState={setStateModal}
        dataTable={dataModal}
        send={sendData}
      />

      <Formulario action='' onSubmit={onSubmit}>
        <CompDate date={date} hour={hour} />
        <input type='submit' hidden />
        <CompInput
          InputState={maquinas}
          InputSetState={setMaquinas}
          inputType='text'
          inputLabel='Maquinas u otros perifericos'
          inputPlaceholder='Nombre de maquina'
          inputName='mayus'
          inputError='Elige una de las opciones desplegadas'
          inputExp={expresiones.maquinas}
          inputAutocomplete='autocompleteInyectoras'
        />

        <CompInput
          InputState={LiderUser}
          inputType='text'
          inputLabel='Lider a cargo'
          inputName='name'
          inputDis='disable'
        />

        <CompInput
          InputState={messageMaquinas}
          InputSetState={setMessageMaquinas}
          inputType='text'
          inputLabel='F0-07-02-32 - Sector Mantenimiento de Inyectoras - Descripcion de rotura/problema:'
          inputPlaceholder='Descripcion de rotura/problema'
          inputName='mayus'
          inputError='La descripcion tiene que ser de 3 a 200 dígitos y solo puede contener letras y espacios.'
          inputExp={expresiones.problemaMaquinas}
        />

        <CompMessage verif={formValidate} />

        <Label>Seleccionar categoria:</Label>

        <div className={styles.divRadio}>
          <div>
            <input
              id='Mejora'
              className={styles.optionInput}
              value='Mejora'
              type='radio'
              checked={radio.checked === 'Mejora'}
              onChange={changeButton}
            />
            <Label htmlFor='Mejora'>Mejora</Label>
          </div>

          <div>
            <input
              id='Programada'
              className={styles.optionInput}
              value='Programada'
              type='radio'
              checked={radio.checked === 'Programada'}
              onChange={changeButton}
            />
            <Label htmlFor='Programada'>Programada</Label>
          </div>

          <div>
            <input
              id='Urgencia'
              className={styles.optionInput}
              value='Urgencia'
              type='radio'
              checked={radio.checked === 'Urgencia'}
              onChange={changeButton}
            />
            <Label htmlFor='Urgencia'>Urgencia</Label>
          </div>
        </div>

        <ContenedorBotonCentrado>
          <Link to='/inyeccion/maquinas'>
            <BotonInicio type='submit'>Cancelar</BotonInicio>
          </Link>
          <Boton type='submit' validate='valid'>
            Enviar
          </Boton>
        </ContenedorBotonCentrado>
      </Formulario>
    </>
  );
};
