import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Switch, Route } from 'react-router-dom'
import Home from './HomeComponent'

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
        <Switch>
            <Route path = '/' component={Home} />
        </Switch>
    </main>
    )
   }
}

export default DataMaster;