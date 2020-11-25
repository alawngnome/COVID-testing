import React, { useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchEmployeeHomeData } from '../Firebase/index';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontFamily: 'roboto',
    fontSize: '1.2em',
    padding: '20px 20px 20px 20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '20vw',
    height: '5vh',
    fontFamily: 'roboto',
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
    border: 'solid #C0C0C0',
  },
  gridItem: {
    backgroundColor: '#002984',
    minHeight: '5vh',
    display: 'flex',
    alignItems: 'center',
    direction: 'row',
  },
  gridItemPart: {
    fontFamily: 'roboto',
    fontSize: '1.1em',
    color: 'white',
    border: 'solid #C0C0C0 ',
  },
  text: {
    textAlign: 'center',
  },
});

export default function EEHome({ user }) {
  const classes = useStyles();

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  let id = '';
  let date = '';
  let result = '';

  useEffect(() => {
    fetchEmployeeHomeData(user.uid).then((data) => {
      setLoading(false);
      let document = [];
      for (let i = 0; i < data.testCollection.length; i++) {
        console.log(data.testCollection[i]);
        id = data.testCollection[i].ID;
        date = data.testCollection[i].collectionTime;
        result = data.testCollection[i].result;
        document.push({ id, date, result });
      }
      setEntries(document);
    });
  }, []);

  if (loading) {
    return null;
  }
  return (
    <div>
      <div className={classes.root}>
        <Paper>Employee Home</Paper>
      </div>
      {/* <h2 className={classes.root}>Employee Home</h2> */}
      <Grid className={classes.gridRoot} container>
        <Grid className={classes.gridItem} item xs={12}>
          <Grid className={classes.gridItemPart} item xs={6}>
            <p className={classes.text}>Collection Date</p>
          </Grid>
          <Grid className={classes.gridItemPart} item xs={6}>
            <p className={classes.text}>Result</p>
          </Grid>
        </Grid>
        {entries.map((entry) => (
          <Grid className={classes.gridItem} item xs={12} key={entry.id}>
            <Grid className={classes.gridItemPart} item xs={6}>
              <p className={classes.text}>{entry.date}</p>
            </Grid>
            <Grid className={classes.gridItemPart} item xs={6}>
              <p className={classes.text}>{entry.result}</p>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
