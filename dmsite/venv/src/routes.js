import React from 'react';
import { Route } from 'react-router-dom';

import Home from './HomeComponent';
import SearchResultsPage from './SearchResultsPage/SearchResultsPage';
import DatasetDetails from './DatasetDetails/DatasetDetails';
import Login from './Authentication/Login';
import CreateAccount from './Authentication/CreateAccount';


const BaseRouter = () => (
  <div>
    <Route exact path="/login" component={Login} />
    <Route path="/createaccount" component={CreateAccount} />
    <Route path="/home" component={Home} />
    <Route path="/search" component={SearchResultsPage} />
    <Route exact path="/details" component={DatasetDetails} />
  </div>
);

export default BaseRouter;
