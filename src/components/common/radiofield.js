import React from 'react';
import {FormControlLabel, Radio} from '@material-ui/core';

const CommonRadioButton = props => {
    const {label, input, disabled } = props;

    return (
        <FormControlLabel value={input.value} control={<Radio size="small" disabled={disabled} />} label={label} />
    )
}

export default CommonRadioButton;