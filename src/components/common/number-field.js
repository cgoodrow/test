import React from 'react';
import NumberFormat from 'react-number-format';
import { TextField } from '@material-ui/core';

const CommonNumberField = props => {
    const {
        input,
        onChange,
        prefix,
        removeFormatting,
        thousandSeparator,
        placeholder,
        label,
        defaultValue,
        disabled,
    } = props;

    return (
        <NumberFormat
        style={{width: '100%'}}
        name={input.name}
        prefix={prefix}
        thousandSeparator={thousandSeparator}
        removeFormatting={removeFormatting}
        {...input}
        customInput={TextField}
        placeholder={placeholder}
        variant="outlined"
        label={label}
        defaultValue={defaultValue}
        value={input.value}
        size="small"
        disabled={disabled}
        onChange={e => {
            input.onChange(e)
            if (onChange) {
              onChange(e);
            }
          }}
        />
    )
}

export default CommonNumberField