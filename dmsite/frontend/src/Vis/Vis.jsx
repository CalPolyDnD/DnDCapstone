import React from 'react';
import Graph from 'react-graph-vis';
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

    componentWillMount() {
        axios.get(FETCH_CURRENT_USER_URL)
           .then((userRes) => {
             fetch(FETCH_URL, {
               method: 'POST',
               body: JSON.stringify({
                 campaign: 'test_campaign',
               }),
             }).then(data => data.json()).then((response) => {
                 this.setState( { fileObject: response});
           });
         });
    }

    getId(c, nodes) {
        for(let i = 0; i < nodes.length; i++) {
            if(nodes[i]['label'] === c) {
                return nodes[i]['id'];
            }
        }
    }

    getGraph() {
        let my_nodes = [];
        let gd = [];
        let classifications_seen = [];
        let counter = 0;

        for(let i = 0; i < this.state.fileObject.length; i++) {
            counter++;
            let file_id = counter;
            my_nodes.push({id: file_id, label: this.state.fileObject[i]['filename'], color: "#e04141"});
            for(let j = 0; j < this.state.fileObject[i]['classifications'].length; j++) {
                let c = this.state.fileObject[i]['classifications'][j]['name'];
                if(classifications_seen.indexOf(c) === -1) {
                    counter++;
                    classifications_seen.push(c);
                    my_nodes.push({id: counter, label: c, color: "#41e0c9"});
                }
                gd.push({from: file_id, to: this.getId(c, my_nodes)})
            }
         }

        let graph = {
            nodes: my_nodes,
            edges: gd
        }

        return graph;
    }

    render() {
      return (
          <div>
            <Graph graph={this.getGraph()} style={{ height: "800px" }} />
          </div>
      );
    }
}

export default withRouter(Vis);