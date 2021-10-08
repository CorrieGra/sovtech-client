import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { Nav } from '../Layout/Nav/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        {
          routes.map((route, i) => (
            <Route
              key={ i }
              exact
              path={ route.path }
              component={ route.component }
            />
          ))
        }
      </Switch>
    </div>
  );
}

export default App;
