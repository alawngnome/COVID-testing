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
    font: 'roboto',
    fontWeight: '500',
    fontSize: '1.2em',
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

// component
function TestCollection() {
  const classes = useStyles();

  // states
  const [id, setId] = useState('');
  const [testBarcode, setTestBarcode] = useState('');
  const [entries, setEntries] = useState([]);

  // handle state functions

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleBarcodeChange = (e) => {
    setTestBarcode(e.target.value);
  };

  const handleAdd = () => {
    const newTest = {
      id,
      testBarcode,
      checked: false,
    };
    let tempEntries = entries;
    tempEntries.push(newTest);
    setEntries(tempEntries);
    setId('');
    setTestBarcode('');
  };

  const handleDelete = () => {
    let tempEntries = entries.filter((entry) => !entry.checked);
    setEntries(tempEntries);
  };

  const handleChecked = (e) => {
    let tempEntries = [];
    entries.forEach((entry) => {
      if (entry.id === e.target.value) {
        // e.target.value = id of entry being modified
        let copyEntry = entry;
        copyEntry.checked = e.target.checked;
        tempEntries.push(copyEntry);
      } else {
        tempEntries.push(entry);
      }
    });
    setEntries(tempEntries);
  };

  // render
  return (
    <Container className={classes.root}>
      <Paper className={classes.header}>Test Collection</Paper>
      <TextField
        className={classes.textField}
        id='outlined-basic'
        label='Employee ID'
        variant='outlined'
        size='small'
        value={id}
        onChange={handleIdChange}
      />
      <TextField
        className={classes.textField}
        id='outlined-basic'
        label='Test Barcode'
        variant='outlined'
        size='small'
        value={testBarcode}
        onChange={handleBarcodeChange}
      />
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={handleAdd}
      >
        Add
      </Button>
      <Grid className={classes.gridRoot} container>
        <Grid className={classes.gridItem} item xs={12}>
          <Grid className={classes.gridItemPart} item xs={6}>
            <p className={classes.text}>Employee ID</p>
          </Grid>
          <Grid className={classes.gridItemPart} item xs={6}>
            <p className={classes.text}>Test Barcode</p>
          </Grid>
        </Grid>
        {entries.map((entry) => (
          <Grid className={classes.gridItem} item xs={12} key={entry.id}>
            <Grid className={classes.checkbox} item xs={1}>
              <Checkbox value={entry.id} onChange={handleChecked} />
            </Grid>
            <Grid className={classes.gridItemPart} item xs={5}>
              <p className={classes.text} style={{ marginRight: '6vw' }}>
                {entry.id}
              </p>
            </Grid>
            <Grid className={classes.gridItemPart} item xs={6}>
              <p className={classes.text}>{entry.testBarcode}</p>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </Container>
  );
}

export default TestCollection;
