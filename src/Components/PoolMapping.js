// imports
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Navbar';

import { fetchPools, fetchEmployees } from '../Firebase/index';
import firebase from '../Firebase/index';

// styles
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  // Pool Mapping
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

  // Test Barcodes
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

  // Textfields for test barcodes
  textField: {
    marginTop: '2vh',
  },

  // Root of the grid of Test barcodes
  gridRoot: {
    display: 'flex',
    direction: 'column',
    width: '20vw',
  },

  // Each Entry in Test Barcode (TextField, Button)
  gridItem: {
    marginTop: '2vh',
    display: 'flex',
    direction: 'row',
    justifyContent: 'center',
  },

  // Delete Button for each textfield
  deleteButton: {
    marginLeft: '1vw',
  },

  // Button for adding another Test Barcode entry (TextField, Button) row
  addRowButton: {
    marginTop: '2vh',
    marginBottom: '4vh',
  },

  // Second grid containing Pools, barcodes for each pool
  gridRoot2: {
    marginTop: '2vh',
    display: 'flex',
    justifyContent: 'center',
  },

  // Each row in the second grid containing the pools, and barcodes for each pool
  gridItem2: {
    backgroundColor: '#002984',
    minHeight: '5vh',
    display: 'flex',
    alignItems: 'center',
    direction: 'row',
  },

  // Each of the two text sections inside gridItem2 (Pool ID and Test Barcode)
  gridItemPart: {
    font: 'roboto',
    fontSize: '1.1em',
    color: 'white',
  },

  // The text inside of each gridItemPart
  text: {
    textAlign: 'center',
  },

  // Final Delete Button for deleting entries in the second grid
  button: {
    marginTop: '2vh',
  },

  // grid at the bottom for buttons edit and delete
  buttonGrid: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'center',
  },
});

// component
function PoolMapping() {
  // contains styles
  const classes = useStyles();

  // states
  const [rows, setRows] = useState([1]); // keeps count of how many test barcodes there are currently (add more rows button adds one to this)
  const [poolBarcode, setPoolBarcode] = useState(''); // Barcode on top, specifying the current pool being entered
  const [inputBarcode, setInputBarcode] = useState({}); // Barcode entries under Test Barcodes. Stored in an object {1: 123, 2: 456, 3: 789}
  // Pool entries in the second grid. Each entry is an object {poolBarcode, testBarcode, checked}
  const [poolEntries, setPoolEntries] = useState([]);

  //{0 :  }

  //use effect
  useEffect(() => {
    fetchPools().then((snapshot) => {
      let allPoolEntries = [];
      let dbpools = [];
      snapshot.docs.forEach((doc) => {
        let data = doc.data();

        let testBarcode = '';
        for (const key in data['testCollection']) {
          testBarcode += data['testCollection'][key]['testBarcode'] + ',';
        }
        if (testBarcode[testBarcode.length - 1] === ',') {
          testBarcode = testBarcode.substring(0, testBarcode.length - 1);
        }

        let poolBarcode = data['poolBarcode'];

        let newPoolEntry = {
          poolBarcode,
          testBarcode,
          checked: false
        };

        allPoolEntries.push(newPoolEntry);
      });

      setPoolEntries(allPoolEntries);
    });
  }, []);

  // handle states
  const handlePoolBarcode = (e) => {
    setPoolBarcode(e.target.value); // pool barcode on topmost part of the screen
  };

  // handle more rows button -> if clicked, add the next counter value to row, and re-render
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

  // for deleting individual test barcode entry (first grid)
  const handleDelete = (rowKey) => {
    let tempInputBarcode = {};
    for (const key in inputBarcode) {
      if (key != rowKey) {
        tempInputBarcode[key] = inputBarcode[key];
      }
    }
    setInputBarcode(tempInputBarcode);

    setRows(rows.filter((rowState) => rowKey !== rowState));
  };

  // handling the textfields in the first grid
  const handleBarcode = (e, name) => {
    setInputBarcode({
      ...inputBarcode, // get all current values of inputBarcode state
      [name]: e.target.value, // add new value in the correct slot in the inputBarcode state
    });
  };

  // handles submission
  const handleSubmit = () => {
    // check for duplicate values
    let dupSet = new Set();
    for (const key in inputBarcode) {
      if (dupSet.has(inputBarcode[key])) {
        alert('Duplicate test barcodes in the list! Clear duplicate values and submit again.');
        return;
      }
      dupSet.add(inputBarcode[key]);
    }

    dupSet.clear();

    // concatenate all the test barcodes
    let testBarcode = '';
    for (const key in inputBarcode) {
      testBarcode += inputBarcode[key] + ',';
    }
    if (testBarcode[testBarcode.length - 1] === ',') {
      testBarcode = testBarcode.substring(0, testBarcode.length - 1);
    }

    // create a new pool entry using poolBarcode, testBarcode, and a checked value for the checkbox
    const newPoolEntry = {
      poolBarcode,
      testBarcode,
      checked: false,
    };

    fetchPools().then((snapshot) => {
      let dbpools = [];

      snapshot.docs.forEach((doc) => {
        let data = doc.data();
        dbpools.push(data);
      });

      for (let i = 0; i < dbpools.length; i++) {
        if (dbpools[i]['poolBarcode'] == newPoolEntry.poolBarcode) {
          alert('Pool barcode already exists!');
          return;
        }
      }

      //Checking if a testBarcode already exists in a pool
      let processingTestBarcodes = new Set();
      for (let i = 0; i < dbpools.length; i++) {
        for(let j = 0; j < dbpools[i]['testCollection'].length; j++) {
          processingTestBarcodes.add(dbpools[i]['testCollection'][j]['testBarcode']);
        }
      }

      for (const key in inputBarcode) {
        if (processingTestBarcodes.has(inputBarcode[key])) {
          alert('A test barcode in this pool already exists in another pool!');
          return;
        }
      }
      
      let usersTests = [];

      fetchEmployees().then((snapshot2) => {

        snapshot2.docs.forEach((doc) => {
          let userData = doc.data();
          let userTests = userData['testCollection'];

          for (let i = 0; i < userTests.length; i++) {
            usersTests[userTests[i]["testBarcode"]] = userData["ID"];
          }
        });

        let testCollection = [];

        for (const key in inputBarcode) {
          if (usersTests[inputBarcode[key]] == undefined) {
            alert("A test in the pool does not exist!");
            return;
          }
          else {
            testCollection.push({ "employeeID": usersTests[inputBarcode[key]], "testBarcode": inputBarcode[key] });
          }
        }

        let newDBpool = {
          "poolBarcode": newPoolEntry.poolBarcode,
          "result": "in progress",
          "testCollection": testCollection,
          "wellBarcode": "",
          "checked": false
        };

        let db = firebase.firestore();

        db.collection('Pool')
          .add(newDBpool)
          .then(function () {
            console.log('Document successfully written!');
            // update poolEntries state, empty the input states on top
            let tempEntries = poolEntries;
            tempEntries.push(newPoolEntry);
            setPoolEntries(tempEntries);
            setPoolBarcode('');
            setInputBarcode({});
          })
          .catch(function (error) {
            console.error('Error writing document: ', error);
          });
      });
    });
  }

  // handle the checkboxes in second grid.
  const handleChecked = (e) => {
    let tempEntries = [];
    poolEntries.forEach((entry) => {
      if (entry.poolBarcode === e.target.value) {
        // e.target.value = poolBarcode of entry being modified
        let copyEntry = entry;
        copyEntry.checked = e.target.checked;
        tempEntries.push(copyEntry);
      } else {
        tempEntries.push(entry);
      }
    });
    setPoolEntries(tempEntries);
  };
  // edit only works for one checked box - do not dare check more than one box
  const handleEditPoolEntries = () => {
    let tempEditEntry = poolEntries.filter((entry) => entry.checked);

    if (tempEditEntry.length != 1) {
      alert('Only 1 pool can be edited at once!');
      return;
    }

    setPoolBarcode(tempEditEntry[0].poolBarcode);
    let barCodeArr = tempEditEntry[0].testBarcode.split(',');
    let tempInput = {};
    for (let i = 0; i < barCodeArr.length; i++) {
      tempInput = {
        ...tempInput,
        [i + 1]: barCodeArr[i],
      };
    }
    setInputBarcode(tempInput);

    //Deleting the entry
    let db = firebase.firestore();
    let deleteEntries = poolEntries.filter((entry) => entry.checked);

    fetchPools().then((snapshot) => {
      let dbpools = [];

      snapshot.docs.forEach((doc) => {
        dbpools.push(doc);
      });

      let idsToDelete = new Set();

      for (let i = 0; i < deleteEntries.length; i++) {
        for (let j = 0; j < dbpools.length; j++) {
          if (deleteEntries[i]['poolBarcode'] === dbpools[j].data()['poolBarcode']) {
            idsToDelete.add(dbpools[j]['ref'].id);
          }
        }
      }

      idsToDelete.forEach(id => {
        db.collection("Pool").doc(id).delete().then(function () {
          console.log("Document successfully deleted!");
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });
      });

      let tempEntries = poolEntries.filter((entry) => !entry.checked);
      setPoolEntries(tempEntries);
    });
  };

  const handleDeletePoolEntries = () => {
    let db = firebase.firestore();
    let deleteEntries = poolEntries.filter((entry) => entry.checked);

    fetchPools().then((snapshot) => {
      let dbpools = [];

      snapshot.docs.forEach((doc) => {
        dbpools.push(doc);
      });

      let idsToDelete = new Set();

      for (let i = 0; i < deleteEntries.length; i++) {
        for (let j = 0; j < dbpools.length; j++) {
          if (deleteEntries[i]['poolBarcode'] === dbpools[j].data()['poolBarcode']) {
            idsToDelete.add(dbpools[j]['ref'].id);
          }
        }
      }

      idsToDelete.forEach(id => {
        db.collection("Pool").doc(id).delete().then(function () {
          console.log("Document successfully deleted!");
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });
      });

      let tempEntries = poolEntries.filter((entry) => !entry.checked);
      setPoolEntries(tempEntries);
    });
  };

  return (
    <div>
      <Header />
      <Container className={classes.root}>
        {/* header */}
        <Paper className={classes.header}>Pool Mapping</Paper>
        <TextField
          className={classes.textField}
          id='outlined-basic'
          label='Pool barcode'
          variant='outlined'
          size='small'
          value={poolBarcode}
          onChange={handlePoolBarcode}
        />
        {/* subheader */}
        <Paper className={classes.subheader}>Test Barcodes</Paper>

        {/* First Grid Containing all the test barcode entries */}
        <Grid className={classes.gridRoot} container>
          {rows.map((row) => (
            <Grid item className={classes.gridItem} key={row} xs={12}>
              <Grid item xs={8}>
                <TextField
                  variant='outlined'
                  size='small'
                  onChange={(e) => handleBarcode(e, row)}
                  value={inputBarcode[row] ? inputBarcode[row] : ''} // if barcode is empty, value is '', otherwise value is inputBarcode[row]
                >
                  {' '}
                </TextField>
              </Grid>
              {/* delete button for each test barcode entry */}
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

        {/* handle more rows button */}
        <Button
          className={classes.addRowButton}
          variant='contained'
          color='primary'
          onClick={handleMoreRows}
        >
          Add More Rows
        </Button>

        {/* submit pool button */}
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Submit Pool
        </Button>

        {/* second grid containing submitted pool entries */}
        <Grid className={classes.gridRoot2} container>
          {/* header for second grid */}
          <Grid className={classes.gridItem2} item xs={12}>
            <Grid className={classes.gridItemPart} item xs={6}>
              <p className={classes.text}>Pool ID</p>
            </Grid>
            <Grid className={classes.gridItemPart} item xs={6}>
              <p className={classes.text}>Test Barcodes</p>
            </Grid>
          </Grid>
          {/* map the poolEntries and put in each entry */}
          {poolEntries.map((entry) => (
            <Grid
              className={classes.gridItem2}
              item
              xs={12}
              key={entry.poolBarcode}
            >
              <Grid className={classes.checkbox} item xs={1}>
                <Checkbox value={entry.poolBarcode} onChange={handleChecked} />
              </Grid>

              <Grid className={classes.gridItemPart} item xs={5}>
                <p className={classes.text} style={{ marginRight: '6vw' }}>
                  {entry.poolBarcode}
                </p>
              </Grid>

              <Grid className={classes.gridItemPart} item xs={6}>
                <p className={classes.text}>{entry.testBarcode}</p>
              </Grid>
            </Grid>
          ))}
        </Grid>
        {/* Grid for containing edit, delete buttons */}
        <Grid container className={classes.buttonGrid} spacing={2}>
          <Grid item>
            {/* Edit Button */}
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              onClick={handleEditPoolEntries}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            {/* final delete button */}
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              onClick={handleDeletePoolEntries}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default PoolMapping;