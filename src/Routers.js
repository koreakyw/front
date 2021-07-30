import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

/*
*
*/
import Board from 'routes/board/Board';

/*
*
*/

import Main from 'routes/Main';

const Routers = (props) => {
  const routes = [
    {
      path: '/board',
      component: Board
    }
  ];

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        {routes.map((route, i) => {
          return (
            <RouteWithSubRoutes
              {...route}
              key={i}
              modal={props.modal}
              toast={props.toast}
              onLoading={props.onLoading}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      exact
      path={route.path}
      render={props => {
        return (
          <route.component
            {...props}
            routes={route.routes}
            modal={route.modal}
            toast={route.toast}
          />
        );
      }}
    />
  );
};

export default Routers;