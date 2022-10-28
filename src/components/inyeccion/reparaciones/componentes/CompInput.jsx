import {
  GroupInput,
  IconoValidacion,
  Input,
  Label,
  LeyendaError,
} from '../styledComponents';
import styles from '../css/CompInput.module.css'
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const machine = 'http://192.168.11.139:4001/api/data/machines';

const molde = 'http://192.168.11.139:4001/api/data/matriceria/moldes';

let data = sessionStorage.getItem('InyeccionUser');

export const CompInput = ({
  InputState,
  InputSetState,
  inputType,
  inputLabel,
  inputPlaceholder,
  inputName,
  inputError,
  inputExp,
  inputDis,
  inputAutocomplete,
}) => {
  const onChange = (e) => {
    InputSetState({
      ...InputState,
      campo: e.target.value,
    });
  };
  const [machines, setMachines] = useState([]);
  const [moldes, setMoldes] = useState([]);

  useEffect(() => {
    getMachine();
    getMolde();
  }, []);

  const getMachine = async () => {
    try {
      const res = await axios.get(machine);
      setMachines(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMolde = async () => {
    try {
      const res = await axios.get(molde);
      setMoldes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (searchTerm) => {
    InputSetState({ ...InputState, campo: searchTerm, valido: 'true' });
    console.log('search ' + searchTerm);
  };

  const validate = () => {
    if (inputExp) {
      if (inputExp.test(InputState.campo)) {
        InputSetState({ ...InputState, valido: 'true' });
      } else {
        InputSetState({ ...InputState, valido: 'false' });
      }
      if (InputState.campo === '') {
        InputSetState({ ...InputState, valido: null });
      }
    }
  };

  return (
    <div>
      <Label htmlFor={inputName} validate={InputState.valido}>
        {inputLabel}
      </Label>

      <GroupInput>
        <Input
          autoComplete='off'
          type={inputType}
          placeholder={inputPlaceholder}
          id={inputName}
          value={
            inputDis === 'disable'
              ? data
              : InputState.campo && inputName === 'mayus'
                ? InputState.campo.toUpperCase()
                : InputState.campo
          }
          onChange={onChange}
          onKeyUp={validate}
          onBlur={validate}
          name={inputName}
          validate={InputState.valido}
          disabled={inputDis}
        />

        <IconoValidacion
          icon={InputState.valido === 'true' ? faCheckCircle : faTimesCircle}
          validate={InputState.valido}
        />
      </GroupInput>
      <LeyendaError validate={InputState.valido}>{inputError}</LeyendaError>

      {inputAutocomplete === 'autocompleteInyectoras' && (
        <div className={styles.flexAuto}>
          {machines
            .filter((item) => {
              const searchTerm = InputState.campo.toLowerCase();
              const fullName = item.Maquina.toLowerCase();
              return (
                searchTerm &&
                fullName.includes(searchTerm) &&
                InputState.valido === 'false'
              );
            })

            .map((item) => (
              <div className={styles.formA} key={item.Maquina}>
                <ul className={styles.list} onClick={() => onSearch(item.Maquina)}>
                  <li className={styles.listItems}>{item.Maquina}</li>
                </ul>
              </div>
            ))}
        </div>
      )}

      {inputAutocomplete === 'autocompleteMoldes' && (
        <div className={styles.flexAutoMoldes}>
          {moldes
            .filter(function (item) {
              const searchTerm = InputState.campo.toLowerCase();
              const fullItem =
                item.molde.toLowerCase() + '' + item.descripcion.toLowerCase();
              return searchTerm && fullItem.includes(searchTerm);
            })

            .map((item) => (
              <div className={styles.formA} key={item.molde}>
                <ul
                  className={styles.list}
                  onClick={() => onSearch(item.molde + ' ' + item.descripcion)}
                >
                  <li className={styles.listItems}>
                    {item.molde} {item.descripcion}
                  </li>
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
