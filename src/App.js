import Login from './Components/Login.js';
import TestCollection from './Components/TestCollection.js';

import React from 'react';
import PoolMapping from './Components/PoolMapping';
import WellTesting from './Components/WellTesting';
import LabHome from './Components/LabHome';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/labhome' component={LabHome} />
          <Route path='/poolmapping' component={PoolMapping} />
          <Route path='/welltesting' component={WellTesting} />
          <Route exact path='/testcollection' component={TestCollection} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
