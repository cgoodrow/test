import React from 'react';
import {Checkbox, FormControlLabel, FormGroup} from '@material-ui/core';


const CommonCheckField = props => {
    const {input, onChange, label, disabled} = props;
    return (
      <FormGroup>
        <FormControlLabel
        control={
          <Checkbox
            checked={input.checked}
            onChange={onChange ? onChange : input.onChange}
            name={input.name}
            color="primary"
            type="checkbox"
            disabled={disabled}
            size="small"
            style={{marginLeft: 0, marginRight: 0}}
          />
        }
        label={label}
      />
      </FormGroup>
    )
}

export default CommonCheckField;