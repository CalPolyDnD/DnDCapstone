import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Switch, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from './HomeComponent';
import DatasetDetails from './DatasetDetails/DatasetDetails';
import Login from './Login';
import Profile from './ProfileComponent';
import SearchResultsPage from './SearchResultsPage/SearchResultsPage';


class DataMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: ''
        }
    }


render() {
return (
    <main>
      <Header />
      <Switch>
        <Route path = '/search' component={SearchResultsPage} />
        <Route path = '/home' component={Home} />
        <Route path = '/login' component={Login}/>
        <Route path = '/profile' component={Profile}/>
      </Switch>
    </main>
    )
   }
//    componentDidMount() {
//        this.getData();
//    }
//
//    getDAta() {
//        this.setSTate({ data: data });
//    }

//    _filterCampaign(query) {
//       fetch(`someendpoint/?query=${query}`)
//        .then((json) => {
//           this.setState({ data: json.data });
//        })
//        .catch((error) => {
//            this.setState({ error });
//        })
//    }
}

export default DataMaster;
