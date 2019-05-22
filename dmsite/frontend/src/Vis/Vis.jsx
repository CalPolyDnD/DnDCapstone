import React from 'react';
import Graph from 'react-graph-vis';
import { render } from "react-dom";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
const FETCH_URL = 'http://localhost:8000/get_files';
const FETCH_CURRENT_USER_URL = 'http://localhost:8000/rest-auth/user/';

class Vis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileObject: []
        }
    };

    graph = {
        nodes: [],
        edges: [],
    };

    options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#000000"
        }
    };

    events = {
        select: function (event) {
            var {nodes, edges} = event;
        }
    };

    componentDidMount() {
        axios.get(FETCH_CURRENT_USER_URL)
           .then((userRes) => {
             fetch(FETCH_URL, {
               method: 'POST',
               body: JSON.stringify({
                 campaign: 'test_campaign',
               }),
             }).then(data => data.json()).then((response) => {
                 console.log(response)
                 this.setState( { fileObject: response})
           });
         });
    }

    render() {
      return (
          <div>
            <Graph graph={this.graph} options={this.options} events={this.events} style={{ height: "800px" }} />
          </div>
      );
    }
}

export default withRouter(Vis);