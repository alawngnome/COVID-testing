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

import firebase from '../Firebase/index';

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

  const db = firebase.firestore();

  // states
  const [id, setId] = useState('');
  const [testBarcode, setTestBarcode] = useState('');
  const [entries, setEntries] = useState([]);

  const ref = db.collection('Employees');

  useEffect(() => {
    let tempEntries = [];
    ref
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          for (let i = 0; i < doc.data().testCollection.length; i++) {
            let currentTestCollection = doc.data().testCollection[i];
            tempEntries.push({
              id: doc.data().ID,
              testBarcode: currentTestCollection.testBarcode,
              checked: currentTestCollection.checked,
              result: currentTestCollection.result,
              collectionTime: currentTestCollection.collectionTime,
            });
          }
        });
      })
      .then(() => {
        setEntries(tempEntries);
      });
  }, [ref]);

  // handle state functions

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleBarcodeChange = (e) => {
    setTestBarcode(e.target.value);
  };

  const handleAdd = async () => {
    let validId = false;
    let docRef;
    let ref = db.collection('Employees');
    let docRef2;
    let count = 0;
    ///
    let currentTestBarcodes = [];
    ///
    await ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        ///
        let tempCourses = doc.data().testCollection;
        for (let i = 0; i < tempCourses.length; i++) {
          currentTestBarcodes.push(tempCourses[i].testBarcode);
        }
        ///
        if (id === doc.data().ID) {
          validId = true;
          docRef = doc;
          docRef2 = snapshot.docs[count].ref.id;
        }
        count++;
      });
    });
    if (!validId) alert('Employee Id is not valid');
    else {
      ///
      for (let i = 0; i < currentTestBarcodes.length; i++) {
        if (currentTestBarcodes[i] === testBarcode) {
          alert('This test barcode is already in use!');
          return;
        }
      }
      ///
      let testCollection = docRef.data().testCollection;
      let addRef = ref.doc(docRef2);
      await addRef.set(
        {
          testCollection: [
            ...testCollection,
            (testCollection[testCollection.length] = {
              collectionTime: new Date().toISOString().slice(0, 10),
              result: 'in progress',
              testBarcode,
              checked: false,
            }),
          ],
        },
        { merge: true }
      );
      setId('');
      setTestBarcode('');
    }
  };

  const handleDelete = () => {
    let ref = db.collection('Employees');
    let testCollection;
    let count = 0;
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        let arr = [];
        let tempRef = snapshot.docs[count].ref.id;
        testCollection = doc.data().testCollection;
        for (let i = 0; i < testCollection.length; i++) {
          if (testCollection[i].checked) {
            arr.push(i);
          }
        }

        let newTestCollection = [];

        for (let i = 0; i < testCollection.length; i++) {
          let toBeAdded = true;
          for (let j = 0; j < arr.length; j++) {
            if (i === arr[j]) toBeAdded = false;
          }
          if (toBeAdded) newTestCollection.push(testCollection[i]);
        }

        ref.doc(tempRef).set(
          {
            testCollection: newTestCollection,
          },
          { merge: true }
        );

        count++;
      });
    });
  };

  const handleChecked = async (e) => {
    let ref = db.collection('Employees');
    let k = 0;
    let docRef;
    let testCollection;
    let goalTestCollection;
    let count = 0;
    await ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (e.target.value === doc.data().ID) {
          testCollection = doc.data().testCollection;
          for (let i = 0; i < testCollection.length; i++) {
            if (testCollection[i].testBarcode === e.target.id) {
              docRef = snapshot.docs[count].ref.id;
              k = i;
              goalTestCollection = testCollection;
            }
          }
        }
        count++;
      });
    });
    for (let i = 0; i < goalTestCollection.length; i++) {
      if (i === k) {
        goalTestCollection[i].checked = !e.target.checked;
      }
    }

    await ref.doc(docRef).set(
      {
        testCollection: goalTestCollection,
      },
      { merge: true }
    );
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
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            key={entry.id + entry.testBarcode}
          >
            <Grid className={classes.checkbox} item xs={1}>
              <Checkbox
                id={entry.testBarcode}
                value={entry.id}
                checked={entry.checked}
                onChange={handleChecked}
              />
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
