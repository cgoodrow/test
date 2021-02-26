import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade, Grid, Typography } from "@material-ui/core";
import { Close } from '@material-ui/icons';

const CommonModal = props => {
  const { open, setOpen, width = 550, header, close, height, backDropclick = false } = props;

  const useStyles = makeStyles(theme => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid transparent",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 3, 3),
      width: width,
      height: height,
      borderRadius: '5px',
      "&:focus": {
        outline: 'none',
      }
    },
    header: {
      fontWeight: 'bold',
      fontSize: '1rem',
      color: '#000',
    },
    close: {
      color: '#000',
      "&:hover": {
        opacity: 0.8,
        cursor: 'pointer'
      }
    },
    closeContainer: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }));

  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={() => setOpen(false)}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      hideBackdrop={backDropclick}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={11}>
              <Typography variant="subtitle1" className={classes.header}>{header}</Typography>
            </Grid>
            <Grid item className={classes.closeContainer} xs={1}>
              {close && <Close className={classes.close} onClick={() => setOpen(false)} />}
            </Grid>
          </Grid>
          {props.children}
        </div>
      </Fade>
    </Modal>
  );
};

export default CommonModal;
