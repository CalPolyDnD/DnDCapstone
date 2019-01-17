import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Switch, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from './HomeComponent';
import DatasetDetails from './DatasetDetails';
import SearchResultsPage from './SearchResultsPage/SearchResultsPage';


class DataMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: ''
        }
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

    render() {
        return (
            <main>
                <Header />
                <Switch>
                    <Route path = '/search' component={SearchResultsPage} />
                    <Route path = '/details' component={DatasetDetails} />;
                    <Route path = '/' component={Home} />
                </Switch>
            </main>
        )
    }
}

export default DataMaster;
