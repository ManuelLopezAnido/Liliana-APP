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
import { useDate } from '../hooks';
import { CompDate, CompInput, CompMessage } from './';
import styles from '../css/FormEdit.module.css'
const URI = 'http://192.168.11.139:4001/api/procesos/forms';

export const FormVisualizar = () => {
  const [formValidate, setFormValidate] = useState(null);
  const [dataRes, setDataRes] = useState([]);
  const { tabla, id } = useParams();
  const { date, hour } = useDate();
  const LiderUser = sessionStorage.getItem('InyeccionUser');
  console.log(LiderUser)
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
    setFormValidate(true);

    let data = {
      id: id,
      fechaCreado: dataRes.fechaCreado,
      horaCreado: dataRes.horaCreado,
      lider: dataRes.lider,
      problema: dataRes.problema,
      fechaNotificado: date,
      horaNotificado: hour,
      notificado: LiderUser,
      fechaReparado: '',
      horaReparado: '',
      repara: '',
      observacionesReparar: '',
      fechaVerificado: '',
      horaVerificado: '',
      verifica: '',
      observacionesVerificar: '',
      estado: 'notificado',
      categoria: dataRes.categoria,
    };

    if (dataRes.molde) {
      data.molde = dataRes.molde;
      axios.put(URI + '/' + tabla, data);
    } else {
      data.maquina = dataRes.maquinas;
      await axios.put(URI + '/' + tabla, data);
    }

    await timeout(1500);

    if (dataRes.molde) {
      window.location.replace('/inyeccion/moldes');
    } else {
      window.location.replace('/inyeccion/inyectoras');
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

                <h3>LIDER QUE CREO LA ORDEN</h3>
                <h5>{dataRes.lider}</h5>
              </div>
              <div>
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
              </div>
            </div>
            <h3>PROBLEMA</h3>
            <h5>{dataRes.problema}</h5>
          </div>
          <h3>ESTADO</h3>
          <H5 validate={dataRes.estado}>{dataRes.estado}</H5>
        </section>

        <Formulario action='' onSubmit={onSubmit}>
          <h1>Pieza "{id}" (NOTIFICADA)</h1>

          <CompDate date={date} hour={hour} />

          <CompInput
            InputState={LiderUser}
            inputType='text'
            inputLabel='Lider que es notificado'
            inputName='name'
            inputDis='disable'
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
              Notificado
            </Boton>
          </ContenedorBotonCentrado>
        </Formulario>
      </Grid>
    </>
  );
};
