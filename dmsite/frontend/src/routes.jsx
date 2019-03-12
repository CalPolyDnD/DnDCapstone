import React from 'react';
import { Route } from 'react-router-dom';

import Home from './home/HomeComponent';
import SearchResultsPage from './SearchResultsPage/SearchResultsPage';
import DatasetDetails from './DatasetDetails/DatasetDetails';
import Login from './Authentication/Login';
import CreateAccount from './Authentication/CreateAccount';
import Profile from './Profile/ProfileComponent';
import Campaign from './CampaignPage/Campaign';
import ClassificationPage from './ClassificationPage/ClassificationPage';

const BaseRouter = () => (
  <div>
    <Route exact path="/login" component={Login} />
    <Route path="/search" component={SearchResultsPage} />
    <Route exact path="/details" component={DatasetDetails} />
    <Route exact path="/profile" component={Profile} />
    <Route path="/register" component={CreateAccount} />
    <Route path="/home" component={Home} />
    <Route path="/campaign" component={Campaign} />
    <Route path="/classification" component={ClassificationPage} />
  </div>
);

export default BaseRouter;
