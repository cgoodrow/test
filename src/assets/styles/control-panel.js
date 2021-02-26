import {makeStyles} from '@material-ui/core/styles';

export const controlPanelStyles = makeStyles(() => ({
    root: {
        width: 250,
        position: 'fixed',
        left: 0,
        bottom: 0,
        height: 450,
        backgroundColor: '#a0a9b1',
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    controlIconWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderBottomStyle: 'inset',
        borderBottom: 'solid 1px rgba(0,0,0,.7)',
        width: 'inherit',
        zIndex: 100,
        position: 'fixed',
        backgroundColor: '#a0a9b1',
    },
    icon: {
        fontSize: '3rem !important',
        padding: 2,

        "&:hover": {
            cursor: 'pointer',
        }
    },
}))