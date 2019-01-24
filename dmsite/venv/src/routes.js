import React from 'react';
import { Route } from 'react-router-dom';

import Home from './HomeComponent';
import SearchResultsPage from './SearchResultsPage/SearchResultsPage';
import DatasetDetails from './DatasetDetails/DatasetDetails';
import Login from './Login';
import Profile from './ProfileComponent';


const BaseRouter = () => (
  <div>
    <Route exact path="/login" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/search" component={SearchResultsPage} />
    <Route exact path="/details" component={DatasetDetails} />
    <Route exact path="/profile" component={Profile} />
  </div>
);

export default BaseRouter;
