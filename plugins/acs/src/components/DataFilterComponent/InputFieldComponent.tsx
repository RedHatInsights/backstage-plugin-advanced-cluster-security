import React , { useEffect }from 'react';
import TextField from '@material-ui/core/TextField';

export const InputFieldComponent: React.FunctionComponent = ({ setUserText }) => {
  const inputFieldValue = "";
  /* eslint @typescript-eslint/no-shadow: ["error", { "allow": ["inputFieldValue"] }]*/

  console.log(inputFieldValue)

  const onChange = (inputFieldValue: string) => {
    setUserText(inputFieldValue);
  };

  return (
    <TextField
      placeholder="Search"
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
