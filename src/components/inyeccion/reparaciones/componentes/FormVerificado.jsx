import { useEffect, useState } from 'react';
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  H5,
  Grid,
  BotonInicio,
} from '../styledComponents';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDate, useInputs } from '../hooks';
import { CompDate, CompInput, CompMessage, CompDenegado } from './';
import styles from '../css/FormEdit.module.css';
const URI = 'http://192.168.11.139:4001/api/procesos/forms';

//const URIEmails = 'http://192.168.11.139:4001/api/sendEmails/send/piezas';

export const FormVerificado = () => {
  const {
    obserVerifica,
    setObserVerifica,
    obserDenega,
    setObserDenega,
    expresiones,
  } = useInputs();

  const [formValidate, setFormValidate] = useState(null);
  const [formValidateDenegado, setFormValidateDenegado] = useState(null);
  const [dataRes, setDataRes] = useState([]);
  const { tabla, id } = useParams();
  const { date, hour } = useDate();
  const [stateModal, setStateModal] = useState(false);
  const LiderUser = sessionStorage.getItem('InyeccionUser');

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const getData = async () => {
    const res = await axios.get(URI + '/' + tabla);
    const result = res.data.filter((idDB) => idDB.id === id);
    setDataRes(result[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let data = {
      id: id,
      fechaCreado: dataRes.fechaCreado,
      horaCreado: dataRes.horaCreado,
      lider: dataRes.lider,
      descripcion: dataRes.descripcion,
      fechaNotificado: dataRes.fechaNotificado,
      horaNotificado: dataRes.horaNotificado,
      notificado: dataRes.notificado,
      fechaReparado: dataRes.fechaReparado,
      horaReparado: dataRes.horaReparado,
      repara: dataRes.repara,
      observacionesReparar: dataRes.observacionesReparar,
      fechaVerificado: date,
      horaVerificado: hour,
      verifica: LiderUser,
      observacionesVerificar: obserVerifica.campo,
      estado: 'verificado',
      categoria: dataRes.categoria,
    };

    if (obserVerifica.valido === 'true') {
      setFormValidate(true);
      if (dataRes.molde) {
        data.molde = dataRes.moldes;
        await axios.put(URI + '/' + tabla, data);
      } else {
        data.maquina = dataRes.maquinas;
        await axios.put(URI + '/' + tabla, data);
      }

      setObserVerifica({ campo: '', valido: null });
      await timeout(2000);

      if (dataRes.molde) {
        window.location.replace('/inyeccion/moldes');
      } else {
        window.location.replace('/inyeccion/maquinas');
      }
    } else {
      setTimeout(() => {
        setFormValidate(null);
      }, 2000);
      setFormValidate(false);
    }
  };

  const ordenDenegada = (e) => {
    e.preventDefault();
    if (obserVerifica.valido !== 'true') {
      setStateModal(!stateModal);
    } else {
      alert('Debe borrar los datos para denegar la orden');
    }
  };

  const sendData = async () => {
    let data = {
      id: id,
      fechaCreado: dataRes.fechaCreado,
      horaCreado: dataRes.horaCreado,
      lider: dataRes.lider,
      problema: dataRes.problema,

      primeraFechaNotificado: dataRes.fechaNotificado,
      primeraHoraNotificado: dataRes.horaNotificado,
      primerNotificado: dataRes.notificado,
      primeraFechaReparado: dataRes.fechaReparado,
      primeraHoraReparado: dataRes.horaReparado,
      primerRepara: dataRes.repara,
      primerObservacionesReparar: dataRes.observacionesReparar,

      primeraFechaDenegado: date,
      primeraHoraDenegado: hour,
      primerLiderDenegado: LiderUser,
      primerMotivoDenegado: obserDenega.campo,

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
      categoria: dataRes.categoria,
    };

    if (obserDenega.valido === 'true') {
      if (dataRes.primeraFechaDenegado) {
        data.primeraFechaDenegado = dataRes.primeraFechaDenegado;
        data.primeraHoraDenegado = dataRes.primeraHoraDenegado;
        data.primerLiderDenegado = dataRes.primerLiderDenegado;
        data.primerMotivoDenegado = dataRes.primerMotivoDenegado;

        data.primeraFechaNotificado = dataRes.primeraFechaNotificado;
        data.primeraHoraNotificado = dataRes.primeraHoraNotificado;
        data.primerNotificado = dataRes.primerNotificado;
        data.primeraFechaReparado = dataRes.primeraFechaReparado;
        data.primeraHoraReparado = dataRes.primeraHoraReparado;
        data.primerRepara = dataRes.primerRepara;
        data.primerObservacionesReparar = dataRes.primerObservacionesReparar;

        data.segundaFechaDenegado = date;
        data.segundaHoraDenegado = hour;
        data.segundoLiderDenegado = LiderUser;
        data.segundoMotivoDenegado = obserDenega.campo;

        data.segundaFechaNotificado = dataRes.fechaNotificado;
        data.segundaHoraNotificado = dataRes.horaNotificado;
        data.segundoNotificado = dataRes.notificado;
        data.segundaFechaReparado = dataRes.fechaReparado;
        data.segundaHoraReparado = dataRes.horaReparado;
        data.segundoRepara = dataRes.repara;
        data.segundoObservacionesReparar = dataRes.observacionesReparar;

        if (dataRes.segundaFechaDenegado) {
          data.primeraFechaDenegado = dataRes.fechaDenegado;
          data.primeraHoraDenegado = dataRes.horaDenegado;
          data.primerLiderDenegado = dataRes.liderDenegado;
          data.primerMotivoDenegado = dataRes.motivoDenegado;

          data.segundaFechaDenegado = dataRes.segundaFechaDenegado;
          data.segundaHoraDenegado = dataRes.segundaHoraDenegado;
          data.segundoLiderDenegado = dataRes.segundoLiderDenegado;
          data.segundoMotivoDenegado = dataRes.segundoMotivoDenegado;

          data.terceraFechaDenegado = date;
          data.terceraHoraDenegado = hour;
          data.tercerLiderDenegado = LiderUser;
          data.tercerMotivoDenegado = obserDenega.campo;

          data.terceraFechaNotificado = dataRes.fechaNotificado;
          data.terceraHoraNotificado = dataRes.horaNotificado;
          data.tercerNotificado = dataRes.notificado;
          data.terceraFechaReparado = dataRes.fechaReparado;
          data.terceraHoraReparado = dataRes.horaReparado;
          data.tercerRepara = dataRes.repara;
          data.tercerObservacionesReparar = dataRes.observacionesReparar;

          if (dataRes.maquina) {
            data.maquina = dataRes.maquinas;
            await axios.put(URI + '/' + tabla, data);
            // await axios.post(URIEmails + '/' + tabla, {
            //   message:
            //     'El dia ' +
            //     date +
            //     ' a las ' +
            //     hour +
            //     ' la orden ' +
            //     id +
            //     ' con la maquina u otro periferico ' +
            //     dataRes.maquinas +
            //     ' fue denegada en el proceso de verificacion por ' +
            //     LiderUser +
            //     ' y el motivo es el siguiente:' +
            //     obserDenega.campo,
            // });
          } else {
            data.molde = dataRes.moldes;
            await axios.put(URI + '/' + tabla, data);
            // await axios.post(URIEmails + '/' + tabla, {
            //   message:
            //     'El dia ' +
            //     date +
            //     ' a las ' +
            //     hour +
            //     ' la orden ' +
            //     id +
            //     ' con el molde ' +
            //     dataRes.moldes +
            //     ' fue denegada en el proceso de verificacion por ' +
            //     LiderUser +
            //     ' y el motivo es el siguiente:' +
            //     obserDenega.campo,
            // });
          }
        } else {
          if (dataRes.maquina) {
            data.maquina = dataRes.maquinas;
            await axios.put(URI + '/' + tabla, data);
            // await axios.post(URIEmails + '/' + tabla, {
            //   message:
            //     'El dia ' +
            //     date +
            //     ' a las ' +
            //     hour +
            //     ' la orden ' +
            //     id +
            //     ' con la maquina u otro periferico ' +
            //     dataRes.maquinas +
            //     ' fue denegada por segunda vez en el proceso de verificacion por ' +
            //     LiderUser +
            //     ' y el motivo es el siguiente:' +
            //     obserDenega.campo,
            // });
          } else {
            data.molde = dataRes.moldes;
            await axios.put(URI + '/' + tabla, data);
            // await axios.post(URIEmails + '/' + tabla, {
            //   message:
            //     'El dia ' +
            //     date +
            //     ' a las ' +
            //     hour +
            //     ' la orden ' +
            //     id +
            //     ' con el molde ' +
            //     dataRes.moldes +
            //     ' fue denegada por segunda vez en el proceso de verificacion por ' +
            //     LiderUser +
            //     ' y el motivo es el siguiente:' +
            //     obserDenega.campo,
            // });
          }
        }
      } else {
        if (dataRes.maquina) {
          data.maquina = dataRes.maquinas;
          await axios.put(URI + '/' + tabla, data);
          // await axios.post(URIEmails + '/' + tabla, {
          //   message:
          //     'El dia ' +
          //     date +
          //     ' a las ' +
          //     hour +
          //     ' la orden ' +
          //     id +
          //     ' con la maquina u otro periferico ' +
          //     dataRes.maquinas +
          //     ' fue denegada en el proceso de verificacion por ' +
          //     LiderUser +
          //     ' y el motivo es el siguiente:' +
          //     obserDenega.campo,
          // });
        } else {
          data.molde = dataRes.moldes;
          await axios.put(URI + '/' + tabla, data);
          // await axios.post(URIEmails + '/' + tabla, {
          //   message:
          //     'El dia ' +
          //     date +
          //     ' a las ' +
          //     hour +
          //     ' la orden ' +
          //     id +
          //     ' con el molde ' +
          //     dataRes.moldes +
          //     ' fue denegada en el proceso de verificacion por ' +
          //     LiderUser +
          //     ' y el motivo es el siguiente:' +
          //     obserDenega.campo,
          // });
        }
      }

      setObserVerifica({ campo: '', valido: null });
      setFormValidateDenegado(true);
      await timeout(1500);
      if (dataRes.molde) {
        window.location.replace('/inyeccion/moldes');
      } else {
        window.location.replace('/inyeccion/maquinas');
      }
    } else {
      setTimeout(() => {
        setFormValidateDenegado(null);
      }, 2000);
      setFormValidateDenegado(false);
    }
  };

  return (
    <>
      <CompDenegado
        state={stateModal}
        setState={setStateModal}
        denegar={obserDenega}
        setDenegar={setObserDenega}
        send={sendData}
        formValidate={formValidateDenegado}
        setFormValidate={setFormValidateDenegado}
      />
      <Grid>
        <section className={styles.sectionh3h5}>
          <div className={styles.contentGrid}>
            <div className={styles.GRID}>
              <div>
                <h3>FECHA CREADO</h3>
                <h5>{dataRes.fechaCreado}</h5>
                <h3>HORA CREADO</h3>
                <h5>{dataRes.horaCreado}</h5>

                {dataRes.molde ? (
                  <>
                    <h3>MOLDE</h3>
                    <h5>{dataRes.molde}</h5>
                  </>
                ) : (
                  <>
                    <h3>MAQUINA</h3>
                    <h5>{dataRes.maquina}</h5>
                  </>
                )}

                <h3>LIDER QUE CREO LA ORDEN</h3>
                <h5>{dataRes.lider}</h5>
                <h3>PROBLEMA</h3>
                <h5>{dataRes.problema}</h5>
                <h3>FECHA NOTIFICADO</h3>
                <h5>{dataRes.fechaNotificado}</h5>
              </div>
              <div>
                <h3>HORA NOTIFICADO</h3>
                <h5>{dataRes.horaNotificado}</h5>
                <h3>QUIEN NOTIFICO LA ORDEN</h3>
                <h5>{dataRes.notificado}</h5>
                <h3>FECHA REPARADO</h3>
                <h5>{dataRes.fechaReparado}</h5>
                <h3>HORA REPARADO</h3>
                <h5>{dataRes.horaReparado}</h5>
                <h3>QUIEN REPARO LA ORDEN</h3>
                <h5>{dataRes.repara}</h5>
                <h3>OBSERVACIONES (REPARACION)</h3>
                <h5>{dataRes.observacionesReparar}</h5>
              </div>
            </div>
          </div>
          <h3>ESTADO</h3>
          <H5 validate={dataRes.estado}>{dataRes.estado}</H5>
        </section>

        <Formulario action='' onSubmit={onSubmit}>
          <h1>Pieza "{id}" (VERIFICADA)</h1>
          <CompDate date={date} hour={hour} />

          <CompInput
            InputState={LiderUser}
            inputType='text'
            inputLabel='Lider que verifica'
            inputName='name'
            inputDis='disable'
            mensaje={expresiones.verifica}
          />

          <CompInput
            InputState={obserVerifica}
            InputSetState={setObserVerifica}
            inputType='text'
            inputLabel='Observacion (VERIFICADO)'
            inputPlaceholder='Observacion a tener en cuenta'
            inputName='mayus'
            inputError='La observacion a tener en cuenta tiene que ser de 3 a 200 dígitos y solo puede contener numeros, letras y guion bajo.'
            inputExp={expresiones.obserVerifica}
          />

          <CompMessage verif={formValidate} />

          <ContenedorBotonCentrado>
            {dataRes.molde ? (
              <Link to='/inyeccion/moldes'>
                <BotonInicio type='submit'>Atras</BotonInicio>
              </Link>
            ) : (
              <Link to='/inyeccion/maquinas'>
                <BotonInicio type='submit'>Atras</BotonInicio>
              </Link>
            )}
            <Boton onClick={ordenDenegada} validate={'denied'}>
              Denegar
            </Boton>
            <Boton type='submit' validate='valid'>
              Verificado
            </Boton>
          </ContenedorBotonCentrado>
        </Formulario>
      </Grid>
    </>
  );
};
