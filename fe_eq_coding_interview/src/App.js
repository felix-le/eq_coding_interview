import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
} from 'carbon-components-react/lib/components/UIShell';
// components
import Dashboard from './containers/Dashboad';
import DataChart from './containers/MapChart/DataChart';

function App() {
  return (
    <div className='container'>
      <div className='App'>
        <Router>
          <Header aria-label='Felix Le'>
            <HeaderName href='/' prefix='Felix Le'>
              EQ Works - Work Sample
            </HeaderName>
            <HeaderNavigation aria-label='Felix Le'>
              <HeaderMenuItem href='/'>Dashboard</HeaderMenuItem>
              <HeaderMenuItem href='/mapchart'>Map Chart</HeaderMenuItem>
            </HeaderNavigation>
          </Header>
          <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/mapchart' component={DataChart} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
