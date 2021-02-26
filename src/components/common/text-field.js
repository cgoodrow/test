import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const CommonTextField = props => {
    const { input, label, defaultValue, autoFocus, style, type, disabled, onChange, placeholder, multiline, rows, onKeyDown} = props

    const useStyles = makeStyles(() => ({
        // root: {
        //     '& label.Mui-focused': {
        //       color: 'white',
        //     },
        //     '& .MuiInput-underline:after': {
        //       borderBottomColor: 'yellow',
        //     },
        //     '& .MuiOutlinedInput-root': {
        //       '& fieldset': {
        //         borderColor: 'white',
        //       },
        //       '&:hover fieldset': {
        //         borderColor: 'white',
        //       },
        //       '&.Mui-focused fieldset': {
        //         borderColor: 'white',
        //       },
        //     },
        //   },
        input: {
            // width: '100%',
        },
    }));

    const classes = useStyles();

    return (
        <TextField
            name={input.name}
            {...input}
            value={input.value}
            id={input.name || input.id}
            label={label}
            defaultValue={defaultValue}
            variant="outlined"
            size="small"
            // classes={classes}
            className={classes.input}
            onChange={(e) => onChange ? onChange(e) : input.onChange(e)}
            autoFocus={autoFocus}
            style={style}
            type={type || 'text'}
            disabled={disabled}
            placeholder={placeholder}
            multiline={multiline}
            rows={rows}
            onKeyDown={onKeyDown}
        />
    )
}

export default CommonTextField