import React from 'react';
import { MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const CommonDropdown = props => {
    const {
        list = [],
        handleChange,
        selectedValue,
        color,
        width = '100%',
        label,
        input,
        disabled,
     } = props;

    const useStyles = makeStyles(() => ({
        root: {
            color: color,
            width: '100%',

            '&::before': {
                borderBottom: '2px solid #fff;'
            }
        },
        select: {
            color: color,
            width: width,
            padding: '10.5px 8px',
        },
        icon: {
            color: color
        },
    }));

    const classes = useStyles();
    return (
        <FormControl variant="outlined" style={{width: '100%'}}>
            {label && <InputLabel style={{color: '#000'}} id="demo-simple-select-outlined-label">{label}</InputLabel>}
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selectedValue || (input && input.value)}
                onChange={handleChange ? e => handleChange(e) : e => input.onChange(e)}
                classes={classes}
                label={label}
                MenuProps={{
                    style: {zIndex: 35001}
                }}
                disabled={disabled}
                autoWidth={true}
            >
                {list.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default CommonDropdown