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

import Header from './Navbar';

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
  gridHeaderText: {
    backgroundColor: '#0998F2',
    color: 'white',
    fontSize: '1.0em',
    fontWeight: '400',
    textAlign: 'center',
    padding: '2vh',
  },
  gridItem: {
    minHeight: '5vh',
    padding: '2vh',
  },
  gridItemPart: {
    fontFamily: 'Roboto',
    fontSize: '1.5em',
    fontWeight: '1000',
    color: 'white',
  },
  text: {
    backgroundColor: 'gray',
    color: 'white',
    fontSize: '1.0em',
    fontWeight: '400',
    textAlign: 'center',
    padding: '2vh',
  },
});

function WellTesting() {
  const classes = useStyles();

  const [wellBarcode, setWellBarcode] = useState('');
  const [poolBarcode, setPoolBarcode] = useState('');
  const [result, setResult] = useState('');
  const [entries, setEntries] = useState([]);

  const handleChangeWellBarcode = (event) => {
    setWellBarcode(event.target.value);
  };
  const handleChangePoolBarcode = (event) => {
    setPoolBarcode(event.target.value);
  };
  const handleChangeResult = (event) => {
    setResult(event.target.value);
  };
  const handleAdd = () => {
    if (wellBarcode === '' || poolBarcode === '' || result === '') {
      console.log('One of the fields are empty.');
      return;
    }
    entries.push({ wellBarcode, poolBarcode, result });
    setEntries(entries);
    setWellBarcode('');
    setPoolBarcode('');
    setResult('');
  };

  return (
    <div>
      <Header />
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
          onChange={handleChangeWellBarcode}
          value={wellBarcode || ''}
        />
        <TextField
          className={classes.textField}
          id='poolBarcodeField'
          variant='outlined'
          label='Pool barcode:'
          size='small'
          onChange={handleChangePoolBarcode}
          value={poolBarcode || ''}
        />
        <FormControl className={classes.formControl} variant='outlined'>
          <InputLabel id='resultSelect'>Result</InputLabel>
          <Select
            labelId='resultSelect'
            label='Result'
            id='resultSelect'
            onChange={handleChangeResult}
            value={result || ''}
          >
            <MenuItem value={'in progress'}>In progress</MenuItem>
            <MenuItem value={'positive'}>Positive</MenuItem>
            <MenuItem value={'negative'}>Negative</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={handleAdd}
        >
          Add
        </Button>
        <Grid className={classes.gridRoot} container>
          <Grid className={classes.gridItem} container xs={12}>
            <Grid className={classes.gridItemPart} item xs={4} elevation={5}>
              <p className={classes.gridHeaderText}>Well Barcode</p>
            </Grid>
            <Grid className={classes.gridItemPart} item xs={4} elevation={5}>
              <p className={classes.gridHeaderText}>Pool Barcode</p>
            </Grid>
            <Grid className={classes.gridItemPart} item xs={4} elevation={5}>
              <p className={classes.gridHeaderText}>Result</p>
            </Grid>
          </Grid>
          {entries.map((entry) => (
            <Grid className={classes.gridItem} container xs={12} spacing={3}>
              <Grid className={classes.checkbox} item xs={1}>
                <Checkbox color='primary' />
              </Grid>
              <Grid className={classes.gridItemPart} item xs={3}>
                <Paper className={classes.text}>{entry.wellBarcode}</Paper>
              </Grid>
              <Grid className={classes.gridItemPart} item xs={4}>
                <Paper className={classes.text}>{entry.poolBarcode}</Paper>
              </Grid>
              <Grid className={classes.gridItemPart} item xs={4}>
                <Paper className={classes.text}>{entry.result}</Paper>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default WellTesting;
