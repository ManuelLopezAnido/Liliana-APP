import { GroupInputDate, InputDate, Label } from '../styledComponents';

export const CompDate = ({ date, hour }) => {
  return (
    <>
      <GroupInputDate>
        <div>
          <Label validate='cursorNone'>Fecha</Label>
          <InputDate type='text' value={date} disabled />
        </div>

        <div>
          <Label validate='cursorNone'>Hora</Label>
          <InputDate type='text' value={hour} disabled />
        </div>
      </GroupInputDate>
    </>
  );
};
