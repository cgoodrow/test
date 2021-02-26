import React, {lazy} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { TableHead, TableRow, Table, TableCell, TableContainer, Paper } from '@material-ui/core';
import { Field } from 'react-final-form';

const CommonTextField  = lazy(() => import('./text-field'));
const CommonCheckField = lazy(() => import('./checkfield'));
const CommonSelectField = lazy(() => import('./dropdown'));

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 450,
    },
    tableCell: {
        padding: 5,
        "& > div": {
            minWidth: 180,
            "& > label": {
                margin: 0,
            }
        }
    }
}));

const SearchComponent = props => {
    const {data = []} = props
    const classes = useStyles();

    const getFields = type => {
        let field;
        const fields = [{ component: CommonTextField, type: 'textfield' }, { component: CommonCheckField, type: 'checkfield' }, { component: CommonSelectField, type: 'selectField' }];
        fields.forEach(item => {
            if (item.type === type) {
                field = item.component;
            }
        });
        return field;
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.root} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        {data.map(item => (
                            <TableCell className={classes.tableCell} key={item.name}>
                                <Field name={item.name} label={item.label} component={getFields(item.type)} />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    )
}

export default SearchComponent;