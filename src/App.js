import Login from './Components/Login.js';
import EELogin from './Components/EELogin.js';
import TestCollection from './Components/TestCollection.js';

import React from "react";
import PoolMapping from './Components/PoolMapping';
import WellTesting from './Components/WellTesting';
import LabHome from './Components/LabHome';
import Header from "./Components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/labhome"  component = {LabHome}/>
        <Route path="/poolmapping"  component = {PoolMapping}/>
        <Route path="/welltesting" component = {WellTesting} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
