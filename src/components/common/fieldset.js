import React from 'react';
import {FormControl, FormLabel} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const CommonFieldSet = props => {
    const { legend } = props;
    const useStyles = makeStyles(() => ({
        fieldWrapper: {
            display: 'flex',
            flex: 'auto',
            border: `solid 1px rgba(0,0,0,.8) !important`,
            padding: '6px !important',
            borderRadius: 4,
            width: 'auto',
            minHeight: 75,

            '& > legend': {
                textAlign: 'left',
            }
        },
    }));
    const classes = useStyles();

    return (
        <FormControl
            fullWidth
            required
            variant="outlined"
            component="fieldset"
            margin="none"
            className={classes.fieldWrapper}
        >
            <FormLabel component="legend">{legend}</FormLabel>
           <React.Fragment>{props.children}</React.Fragment>
        </FormControl>

    )
}

export default CommonFieldSet