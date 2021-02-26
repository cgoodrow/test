import React from 'react';
import {FormControlLabel, Switch} from '@material-ui/core';

const CommonSwitch = props => {
  const { input, onChange, label, type } = props;
  return (
    <FormControlLabel type="checkbox" label={label}
      control={<Switch
        checked={Boolean(input.checked)}
        onChange={e => onChange ? onChange(e) : input.onChange(e)}
        name={input.name}
        color="primary"
        type={'checkbox' || type}
      />}
    />
  )
}

export default CommonSwitch;