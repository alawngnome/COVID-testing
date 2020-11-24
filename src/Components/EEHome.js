import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
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

export default function EEHome() {
  const classes = useStyles();

  const [entries, setEntries] = useState([]);

  return (
    <div>
      <h2 className={classes.root}>Employee Home</h2>

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
    </div>
  );
}
