import { useState } from 'react';

export const useInputs = () => {
  const [maquinas, setMaquinas] = useState({ campo: '', valido: null });
  const [messageMaquinas, setMessageMaquinas] = useState({
    campo: '',
    valido: null,
  });

  const [molde, setMolde] = useState({ campo: '', valido: null });
  const [messageMolde, setMessageMolde] = useState({ campo: '', valido: null });

  const [obserRepara, setObserRepara] = useState({ campo: '', valido: null });
  const [repara, setRepara] = useState({ campo: '', valido: null });

  const [obserVerifica, setObserVerifica] = useState({
    campo: '',
    valido: null,
  });
  const [obserDenega, setObserDenega] = useState({ campo: '', valido: null });

  const expresiones = {
    maquinas: /^[‎]$/,
    problemaMaquinas: /^[a-zA-Z0-9À-ÿ\s^.,]{3,200}$/,

    molde: /^[‎]$/,
    problemaMoldes: /^[a-zA-Z0-9À-ÿ\s^.,]{3,200}$/,

    repara: /^[a-zA-Z0-9À-ÿ\s^.,]{3,200}$/,
    obserRepara: /^[a-zA-Z0-9À-ÿ\s^.,]{3,200}$/,

    verifica: /^[a-zA-Z0-9À-ÿ\s^.,]{3,150}$/,
    obserVerifica: /^[a-zA-Z0-9À-ÿ\s^.,]{3,150}$/,
  };

  return {
    maquinas,
    setMaquinas,
    messageMaquinas,
    setMessageMaquinas,
    molde,
    setMolde,
    messageMolde,
    setMessageMolde,
    obserRepara,
    setObserRepara,
    repara,
    setRepara,
    obserVerifica,
    setObserVerifica,
    obserDenega,
    setObserDenega,
    expresiones,
  };
};
