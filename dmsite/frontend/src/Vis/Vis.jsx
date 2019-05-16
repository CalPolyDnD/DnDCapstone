import React from 'react';
import Graph from 'react-graph-vis';
import { render } from "react-dom";
import axios from 'axios';
const FETCH_URL = 'http://localhost:8000/get_files';
const FETCH_CURRENT_USER_URL = 'http://localhost:8000/rest-auth/user/';

class Vis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

    graph = {
        nodes: [
            {id: 1, label: "Node 1", color: "#e04141"},
            {id: 2, label: "Node 2", color: "#e09c41"},
            {id: 3, label: "Node 3", color: "#e0df41"},
            {id: 4, label: "Node 4", color: "#7be041"},
            {id: 5, label: "Node 5", color: "#41e0c9"}
        ],
        edges: [{from: 1, to: 2}, {from: 1, to: 3}, {from: 2, to: 4}, {from: 2, to: 5}]
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
             // put your code here
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

export default Vis