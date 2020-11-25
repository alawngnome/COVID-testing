import React, { useState, useEffect } from 'react';
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
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Navbar';
import { fetchPools } from '../Firebase/index.js';

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
    marginLeft: '2vh',
    marginRight: '2vh',
  },
  gridRoot: {
    marginTop: '2vh',
    display: 'flex',
    justifyContent: 'center',
  },
  gridHeaderText: {
    backgroundColor: '#0998F2',
    color: 'white',
    fontSize: '1.5em',
    fontWeight: '500',
    textAlign: 'center',
    padding: '2vh',
  },
  gridRow: {
    minHeight: '5vh',
    padding: '2vh',
  },
  gridItem: {
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
  const [editBtnActive, setEditBtnActive] = useState(true);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangeWellBarcode = (event) => {
    setWellBarcode(event.target.value);
  };
  const handleChangePoolBarcode = (event) => {
    setPoolBarcode(event.target.value);
  };
  const handleChangeResult = (event) => {
    setResult(event.target.value);
  };
  const handleChecked = (event) => {
    let checkedCount = 0;
    entries.map((entry) => {
      if (entry.wellBarcode === event.target.value) {
        entry.checked = event.target.checked;
      }
      if (entry.checked) {
        checkedCount++;
      }
    });
    if (checkedCount > 1) setEditBtnActive(false);
    else setEditBtnActive(true);
    setEntries(entries);
  };
  const handleAdd = () => {
    if (wellBarcode === '' || poolBarcode === '' || result === '') {
      console.log('One of the fields are empty.');
      return;
    }
    fetchPools().then((snapshot) => {
      snapshot.forEach((doc) => {
        let data = doc.data();
        let docWellBarcode = data.wellBarcode;
        let docPoolBarcode = data.poolBarcode;
        if (docWellBarcode == '' && poolBarcode == docPoolBarcode) {
          doc.ref
            .set({ wellBarcode: wellBarcode, result: result }, { merge: true })
            .then(() => {
              fetchPools().then((snapshot) => {
                let tempEntries = [];
                snapshot.forEach((doc) => {
                  let data = doc.data();
                  let wellBarcode = data.wellBarcode;
                  let poolBarcode = data.poolBarcode;
                  let result = data.result;
                  if (wellBarcode != '')
                    tempEntries.push({
                      wellBarcode,
                      poolBarcode,
                      result,
                      checked: false,
                    });
                });
                setEntries(tempEntries);
                setLoading(false);
              });
            });
        } else {
          console.log(
            'Well barcode already exists or Pool barcode does not exist.'
          );
        }
      });
      setWellBarcode('');
      setPoolBarcode('');
      setResult('');
    });
  };
  const handleDelete = () => {
    let deleteWellBarcodes = [];
    entries.map((entry) => {
      if (entry.checked) deleteWellBarcodes.push(entry.wellBarcode);
    });
    fetchPools().then((snapshot) => {
      snapshot.forEach((doc) => {
        let data = doc.data();
        let wellBarcode = data.wellBarcode;
        deleteWellBarcodes.forEach((deleteBarcode) => {
          if (wellBarcode === deleteBarcode) {
            doc.ref.set({ wellBarcode: '' }, { merge: true }).then(() => {
              fetchPools().then((snapshot) => {
                let tempEntries = [];
                snapshot.forEach((doc) => {
                  let data = doc.data();
                  let wellBarcode = data.wellBarcode;
                  let poolBarcode = data.poolBarcode;
                  let result = data.result;
                  if (wellBarcode != '')
                    tempEntries.push({
                      wellBarcode,
                      poolBarcode,
                      result,
                      checked: false,
                    });
                });
                setEntries(tempEntries);
                setLoading(false);
              });
            });
          }
        });
      });
    });
  };

  // For reading from Firestore
  useEffect(() => {
    fetchPools().then((snapshot) => {
      let tempEntries = [];
      snapshot.forEach((doc) => {
        let data = doc.data();
        let wellBarcode = data.wellBarcode;
        let poolBarcode = data.poolBarcode;
        let result = data.result;
        if (wellBarcode != '')
          tempEntries.push({
            wellBarcode,
            poolBarcode,
            result,
            checked: false,
          });
      });
      setEntries(tempEntries);
      setLoading(false);
    });
  }, []);

  if (loading) return null;
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
          <Grid className={classes.gridRow} container xs={12}>
            <Grid className={classes.gridItem} item xs={4} elevation={5}>
              <p className={classes.gridHeaderText}>Well Barcode</p>
            </Grid>
            <Grid className={classes.gridItem} item xs={4} elevation={5}>
              <p className={classes.gridHeaderText}>Pool Barcode</p>
            </Grid>
            <Grid className={classes.gridItem} item xs={4} elevation={5}>
              <p className={classes.gridHeaderText}>Result</p>
            </Grid>
          </Grid>
          {entries.map((entry) => (
            <Grid
              className={classes.gridRow}
              container
              xs={12}
              spacing={3}
              key={entry.wellBarcode}
            >
              <Grid className={classes.checkbox} item xs={1}>
                <Checkbox
                  color='primary'
                  value={entry.wellBarcode}
                  onChange={handleChecked}
                />
              </Grid>
              <Grid className={classes.gridItem} item xs={3}>
                <Paper className={classes.text}>{entry.wellBarcode}</Paper>
              </Grid>
              <Grid className={classes.gridItem} item xs={4}>
                <Paper className={classes.text}>{entry.poolBarcode}</Paper>
              </Grid>
              <Grid className={classes.gridItem} item xs={4}>
                <Paper className={classes.text}>{entry.result}</Paper>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Box>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={!editBtnActive}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Container>
      <br />
      <br />
    </div>
  );
}

export default WellTesting;
