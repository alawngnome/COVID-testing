import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
    padding: '2vh',
    fontFamily: 'Roboto',
    fontWeight: '1000',
    fontSize: '2em',
  },
  textField: {
    marginTop: '2vh',
  },
  formControl: {
    marginTop: '2vh',
    minWidth: 120,
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
    font: 'Roboto',
    fontSize: '1.1em',
    color: 'white',
  },
  text: {
    textAlign: 'center',
  },
});

function WellTesting() {
  const classes = useStyles();

  const [wellBarcode, setWellBarcode] = useState(0);
  const [pollBarcode, setPollBarcode] = useState(0);
  const [result, setResult] = useState('');

  const handleSelect = (event) => {
    setResult(event.target.value);
  };

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
      <TextField
        className={classes.textField}
        id='pollBarcodeField'
        variant='outlined'
        label='Poll barcode:'
        size='small'
      />
      <FormControl className={classes.formControl} variant='outlined'>
        <InputLabel id='resultSelect'>Result</InputLabel>
        <Select
          labelId='resultSelect'
          label='Result'
          id='resultSelect'
          onChange={handleSelect}
          value={result}
        >
          <MenuItem value={'in progress'}>In progress</MenuItem>
          <MenuItem value={'positive'}>Positive</MenuItem>
          <MenuItem value={'negative'}>Negative</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
}

export default WellTesting;
