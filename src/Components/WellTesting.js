// imports
import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// styles
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20vw',
    height: '5vh',
    padding: '2vh',
    fontFamily: 'Roboto',
    fontWeight: '1000',
    fontSize: '2em',
  },
  textField: {
    marginTop: '2vh',
  },
  button: {
    marginTop: '2vh',
  },
  gridRoot: {
    marginTop: '2vh',
    display: 'flex',
    justifyContent: 'center',
  },
  gridItem: {
    backgroundColor: '#002984',
    minHeight: '5vh',
    display: 'flex',
    alignItems: 'center',
    direction: 'row',
  },
  gridItemPart: {
    font: 'roboto',
    fontSize: '1.1em',
    color: 'white',
  },
  text: {
    textAlign: 'center',
  },
});

function WellTesting() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Paper className={classes.header} elevation={10}>
        Well Testing
      </Paper>
      <br></br>
      <TextField
        className={classes.textField}
        id='wellBarcodeField'
        variant='outlined'
        label='Well barcode:'
        size='small'
      />
    </Container>
  );
}

export default WellTesting;
