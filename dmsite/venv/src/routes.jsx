import React from 'react';
import { Route } from 'react-router-dom';

import Home from './home/HomeComponent';
import SearchResultsPage from './SearchResultsPage/SearchResultsPage';
import DatasetDetails from './home/DatasetDetails/DatasetDetails';
import Login from './Authentication/Login';


const BaseRouter = () => (
  <div>
    <Route exact path="/login" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/search" component={SearchResultsPage} />
    <Route exact path="/details" component={DatasetDetails} />
  </div>
);

export default BaseRouter;
