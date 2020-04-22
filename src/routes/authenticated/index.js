import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameLobby from '../../components/lobby/gameLobby';
import Game from '../../components/crossword/Game';

const AuthenticatedRoutes = () => (
  <Switch>
    {/* <Route exact path="/dashboard" component={() => <div>Welcome to the dashboard</div>} /> */}
    <Route exact path="/lobby" component={GameLobby} />
    <Route exact path="/" component={GameLobby} />
    <Route exact path="/game/:gameId" component={Game} />
  </Switch>
);

export default AuthenticatedRoutes;
