import 'date-fns';

import React from 'react';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';

const CommonDatePicker = (props) => {
  const { input, label, onChange, value, defaultValue, readOnly, disabled } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        format="MM/dd/yyyy"
        defaultValue={defaultValue}
        id={input.name}
        name={input.name}
        label={label}
        value={value || input.value}
        onChange={(e) => (onChange ? onChange(e) : input.onChange(e))}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        inputVariant="outlined"
        variant="inline"
        size="small"
        readOnly={readOnly}
        disabled={disabled}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CommonDatePicker