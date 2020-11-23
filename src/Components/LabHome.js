import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import PoolMapping from './PoolMapping';
import WellTesting from './WellTesting';

//maybe a better name for this would be LabHomeNav
export default function LabHome() {
  return (
    <Router>
      <nav>
        <Link to='/'>Lab Home</Link> |{' '}
        <Link to='/poolmapping'>Pool Mapping</Link> |{' '}
        <Link to='/welltesting'>Well Testing</Link>
      </nav>
      <Switch>
        <Route path='/poolmapping'>
          <PoolMapping />
        </Route>
        <Route path='/welltesting'>
          <WellTesting />
        </Route>
        <Route path='/'>
          <LabHomeInfo />
        </Route>
      </Switch>
    </Router>
  );
}

function LabHomeInfo() {
  return <h2>Select a page to navigate to.</h2>;
}
