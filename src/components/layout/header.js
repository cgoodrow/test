import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    useScrollTrigger,
    Slide,
    IconButton
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import SideBar from './sidebar';
// import amentumLogo from 'assets/images/DynCorp_small.png';

export const HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const HideAppBar = (props) => {
  const {open, setOpen, clsx} = props;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#425563 !important',
      color: '#fff',
      fontWeight: 'bold',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
  }));
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          classes={{root: classes.root}}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <Menu />
          </IconButton>
            <Link style={{color: '#fff'}} to='/purchase-order'>Purchase Order</Link>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <SideBar {...{open, setOpen}}/>
    </React.Fragment>
  );
}

export default HideAppBar;
