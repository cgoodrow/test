import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const CommonBox = props => {
    const useStyles = makeStyles(() => ({
        box: {
            display: 'flex',
            flex: 'auto',
            border: `solid 1px rgba(0,0,0,.8) !important`,
            padding: '6px !important',
            borderRadius: 4,
            minHeight: 75
        },
    }));
    const classes = useStyles();

    return (
        <Box className={classes.box} component="div">
            <React.Fragment>{props.children}</React.Fragment>
        </Box>

    )
}

export default CommonBox