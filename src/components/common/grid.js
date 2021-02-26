import React, {useState} from 'react';
import { TableContainer, Table, TableRow, TableHead, TableCell, Paper, TablePagination, TableSortLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        zIndex: 0,

        '& > thead > tr > th': {
            zIndex: 0
        }
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    iconTd: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '6px 7px'
    },
    container: {
        maxHeight: 440,
    },
}));

const CommonDynGrid = props => {
    const { rows, order, orderBy, setOrder, setOrderBy, data, hasPaging = true } = props;
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const EnhancedTableHead = () => {
        return (
            <TableHead>
                <TableRow>
                    {rows.map((row, index) => (
                        <TableCell
                            key={index}
                            sortDirection={orderBy === row.key ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === row.key}
                                direction={orderBy === row.key ? order : 'asc'}
                                onClick={() => handleRequestSort(row.key)}
                            >
                                {row.name}
                                {orderBy === row.key ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer className={classes.container}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='small'
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <EnhancedTableHead />
                            {props.children}
                    </Table>
                </TableContainer>
                {hasPaging &&
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />}
            </Paper>
        </div>
    )
}

export default CommonDynGrid;