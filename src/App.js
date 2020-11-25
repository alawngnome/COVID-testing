import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Login from './Components/Login';
import TestCollection from './Components/TestCollection';
import EELogin from './Components/EELogin';
import EEHome from './Components/EEHome';
import PoolMapping from './Components/PoolMapping';
import WellTesting from './Components/WellTesting';
import LabHome from './Components/LabHome';
import firebase from './Firebase/index';

const useStyles = makeStyles({});

function App() {
  const classes = useStyles();
  const [user, setUser] = useState();
  useEffect(() => {
    /*const unsubscribe = */firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser();
      }
      //unsubscribe();
    });
  }, []);

  return (
    <div className={classes.container}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/eelogin' component={EELogin} />
        </Switch>
        {user !== undefined && (
          <Switch>
            <Route path='/labhome' component={LabHome} />
            <Route path='/poolmapping' component={PoolMapping} />
            <Route path='/welltesting' component={WellTesting} />
            <Route path='/testcollection' component={TestCollection} />
            <Route path='/eehome'>
              <EEHome user={user} />{' '}
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
