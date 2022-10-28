import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export const useDate = () => {
  const [, setSeconds] = useState(0);

  dayjs.locale('es');

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const date = dayjs().format('DD-MM-YYYY');
  const hour = dayjs().format('HH:mm');

  const dia = dayjs().format('DD');
  const mes = dayjs().format('MM');
  const year = dayjs().format('YYYY');

  const hora = dayjs().format('HH');
  const min = dayjs().format('mm');

  return { date, hour, dia, mes, year, hora, min };
};
