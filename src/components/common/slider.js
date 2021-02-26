import React from 'react';
import {Slider} from '@material-ui/core';

const CommonSlider = props => {
    const {input, onChange, defaultValue, disabled} = props;

    return (
      <Slider
        {...input}
        value={input.value || 100}
        defaultValue={defaultValue || 100}
        name={input.name}
        onChange={(e, value) =>
          onChange ? onChange(e, value) : input.onChange(value)
        }
        aria-labelledby="continuous-slider"
        disabled={disabled}
        marks={true}
        valueLabelDisplay="on"
        style={{marginRight: 5, marginLeft: 5}}
      />
    );
}

export default CommonSlider;