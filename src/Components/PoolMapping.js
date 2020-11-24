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
    font: 'roboto',
    fontWeight: '500',
    fontSize: '1.2em',
  },
  subheader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20vw',
    height: '5vh',
    font: 'roboto',
    fontWeight: '500',
    fontSize: '1.2em',
    marginTop: '2vh',
  },
  textField: {
    marginTop: '2vh',
  },
  gridRoot: {
    display: 'flex',
    direction: 'column',
    width: '20vw',
  },
  gridItem: {
    marginTop: '2vh',
    display: 'flex',
    direction: 'row',
    justifyContent: 'center',
  },
  deleteButton: {
    marginLeft: '1vw',
  },
  addRowButton: {
    marginTop: '2vh',
    marginBottom: '4vh',
  },
  submitButton: {},
});

function PoolMapping() {
  const classes = useStyles();

  const [rows, setRows] = useState([1]);

  const handleMoreRows = () => {
    let tempRows = [];
    rows.forEach((row) => {
      tempRows.push(row);
    });
    if (tempRows.length === 0) tempRows.push(1);
    else {
      tempRows.push(tempRows[tempRows.length - 1] + 1);
    }
    setRows(tempRows);
  };

  const handleDelete = (rowKey) => {
    setRows(rows.filter((rowState) => rowKey !== rowState));
  };

  return (
    <Container className={classes.root}>
      <Paper className={classes.header}>Pool Mapping</Paper>
      <TextField
        className={classes.textField}
        id='outlined-basic'
        label='Pool barcode'
        variant='outlined'
        size='small'
      />
      <Paper className={classes.subheader}>Test Barcodes</Paper>
      <Grid className={classes.gridRoot} container>
        {rows.map((row) => (
          <Grid item className={classes.gridItem} key={row} xs={12}>
            <Grid item xs={8}>
              <TextField variant='outlined' size='small'>
                {' '}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <Button
                className={classes.deleteButton}
                variant='contained'
                color='secondary'
                onClick={() => handleDelete(row)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Button
        className={classes.addRowButton}
        variant='contained'
        color='primary'
        onClick={handleMoreRows}
      >
        Add More Rows
      </Button>
      <Button
        className={classes.submitButton}
        variant='contained'
        color='primary'
      >
        Submit Pool
      </Button>
    </Container>
  );
}

export default PoolMapping;
