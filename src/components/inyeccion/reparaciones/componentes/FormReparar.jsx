import { useEffect, useState } from 'react';
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  BotonInicio,
  Grid,
  H5,
} from '../styledComponents';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDate, useInputs } from '../hooks';
import { CompDate, CompInput, CompMessage } from './index';
import styles from '../css/FormEdit.module.css'
const URI = 'http://192.168.11.139:4001/api/procesos/forms';

const URIEmails = 'http://192.168.11.139:4001/api/sendEmails/send/piezas';

export const FormReparar = () => {
  const { repara, setRepara, obserRepara, setObserRepara, expresiones } =
    useInputs();

  const [formValidate, setFormValidate] = useState(null);
  const [dataRes, setDataRes] = useState([]);
  const { tabla, id } = useParams();
  const { date, hour } = useDate();

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
      problema: dataRes.problema,
      fechaNotificado: dataRes.fechaNotificado,
      horaNotificado: dataRes.horaNotificado,
      notificado: dataRes.notificado,
      fechaReparado: date,
      horaReparado: hour,
      repara: repara.campo,
      observacionesReparar: obserRepara.campo,
      fechaVerificado: '',
      horaVerificado: '',
      verifica: '',
      observacionesVerificar: '',
      estado: 'reparado',
      categoria: dataRes.categoria,
    };

    if (obserRepara.valido === 'true') {
      setFormValidate(true);
      if (dataRes.molde) {
        data.molde = dataRes.molde;
        axios.put(URI + '/' + tabla, data);

        await axios.post(URIEmails + '/' + tabla, {
          message:
            'El dia' +
            date +
            'a las ' +
            hour +
            ' la orden ' +
            id +
            ' con el molde ' +
            dataRes.molde +
            ' fue reparada por ' +
            repara.campo +
            ' y se tuvo en cuenta lo siguiente:' +
            obserRepara.campo,
        });
      } else {
        data.maquina = dataRes.maquina;
        await axios.put(URI + '/' + tabla, data);
        await axios.post(URIEmails + '/' + tabla, {
          message:
            'El dia' +
            date +
            'a las ' +
            hour +
            ' la orden ' +
            id +
            ' con la maquina u otro periferico ' +
            dataRes.maquina +
            ' fue reparada por ' +
            repara.campo +
            ' y se tuvo en cuenta lo siguiente:' +
            obserRepara.campo,
        });
      }

      setRepara({ campo: '', valido: null });
      setObserRepara({ campo: '', valido: null });

      await timeout(1500);

      if (dataRes.molde) {
        window.location.replace('inyeccion/moldes');
      } else {
        window.location.replace('inyeccion/maquinas');
      }
    } else {
      setFormValidate(false);
    }
  };

  return (
    <>
      <Grid>
        <section className={styles.sectionh3h5}>
          <div className={styles.contentGrid}>
            <div className={styles.GRID}>
              <div>
                <h3>FECHA CREADO</h3>
                <h5>{dataRes.fechaCreado}</h5>

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

                <h3>FECHA NOTIFICADO</h3>
                <h5>{dataRes.fechaNotificado}</h5>
                <h3>QUIEN NOTIFICO LA ORDEN</h3>
                <h5>{dataRes.notificado}</h5>
              </div>
              <div>
                <h3>HORA CREADO</h3>
                <h5>{dataRes.horaCreado}</h5>
                <h3>LIDER QUE CREO LA ORDEN</h3>
                <h5>{dataRes.lider}</h5>
                <h3>HORA NOTIFICADO</h3>
                <h5>{dataRes.horaNotificado}</h5>
                <h3>PROBLEMA</h3>
                <h5>{dataRes.problema}</h5>
              </div>
            </div>
          </div>
          <div>
            <h3>ESTADO</h3>
            <H5 validate={dataRes.estado}>{dataRes.estado}</H5>
          </div>
        </section>
        <Formulario action='' onSubmit={onSubmit}>
          <h1>Pieza "{id}" (REPARACION)</h1>

          <CompDate date={date} hour={hour} />
          <input type='submit' hidden />
          <CompInput
            InputState={repara}
            InputSetState={setRepara}
            inputType='text'
            inputLabel='Quien repara'
            inputPlaceholder='Nombre de quien repara'
            inputName='repara'
            inputError='El nombre tiene que ser de 3 a 200 dígitos y solo puede contener numeros, letras y guion bajo.'
            inputExp={expresiones.repara}
          />

          <CompInput
            InputState={obserRepara}
            InputSetState={setObserRepara}
            inputType='text'
            inputLabel='Observaciones (REPARADO)'
            inputPlaceholder='Observacion a tener en cuenta'
            inputName='recibe'
            inputError='La observacion a tener en cuenta tiene que ser de 3 a 200 dígitos y solo puede contener numeros, letras y guion bajo.'
            inputExp={expresiones.obserRepara}
          />

          <CompMessage verif={formValidate} />

          <ContenedorBotonCentrado>
            {dataRes.molde ? (
              <Link to='/CompTableMatriceria'>
                <BotonInicio type='submit'>Atras</BotonInicio>
              </Link>
            ) : (
              <Link to='/CompTableInyectoras'>
                <BotonInicio type='submit'>Atras</BotonInicio>
              </Link>
            )}
            <Boton type='submit' validate='valid'>
              Reparado
            </Boton>
          </ContenedorBotonCentrado>
        </Formulario>
      </Grid>
    </>
  );
};
