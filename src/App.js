import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Login from './Components/Login';
import TestCollection from './Components/TestCollection';
import EELogin from './Components/EELogin';
import EEHome from './Components/EEHome';
import PoolMapping from './Components/PoolMapping';
import WellTesting from './Components/WellTesting';
import LabHome from './Components/LabHome';

const useStyles = makeStyles({});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/labhome' component={LabHome} />
          <Route path='/poolmapping' component={PoolMapping} />
          <Route path='/welltesting' component={WellTesting} />
          <Route path='/testcollection' component={TestCollection} />
          <Route path='/eelogin' component={EELogin} />
          <Route path='/eehome' component={EEHome} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
