import React from 'react';
import Graph from 'react-graph-vis';
import { render } from 'react-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const FETCH_URL = 'http://localhost:8000/get_files';
const FETCH_CURRENT_USER_URL = 'http://localhost:8000/rest-auth/user/';

class Vis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileObject: [],
    };
  }

  componentWillMount() {
    axios.get(FETCH_CURRENT_USER_URL)
      .then((userRes) => {
        fetch(FETCH_URL, {
          method: 'POST',
          body: JSON.stringify({
            campaign: 'test_campaign',
          }),
        }).then(data => data.json()).then((response) => {
          this.setState({ fileObject: response });
          console.log(this.state.fileObject);
        });
      });
  }

  getFile() {
    const nodes = [];
    console.log('in get file');
    for (let i = 0; i < this.state.fileObject.length; i++) {
      nodes.push({ id: i, label: this.state.fileObject[i].filename, color: '#e04141' });
    }
    for (let i = 0; i < this.state.fileObject.length; i++) {
      for (let j = 0; j < this.state.fileObject[i].filename.length; j++) {
        nodes.push({
          id: i + this.state.fileObject.length,
          label: this.state.fileObject[i].classifications[j].name,
          color: '#41e0c9',
        });
      }
    }
    console.log(nodes);
    return nodes;
  }

  getEdges() {
    const graph_dict = [];
    const edges = [];
    let count = this.state.fileObject.length;
    for (let i = 0; i < this.state.fileObject.length; i++) {
      graph_dict.push(this.getClassifications(this.state.fileObject[i].filename.length, count));
      count += this.state.fileObject[i].filename.length;
    }
    for (let i = 0; i < graph_dict.length; i++) {
      for (let j = 0; j < graph_dict[i].length; j++) {
        edges.push({ to: i, from: j });
      }
    }
    return edges;
  }

  getClassifications(len, count) {
    const edgeIndex = [];
    for (let i = 0; i < len; i++) {
      edgeIndex.push(i + count);
    }
    return edgeIndex;
  }

  getGraph() {
    let graph = {
      nodes: [this.getFile()],
      edges: [this.getEdges()],
    };
    return graph;
  }

  options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: '#000000',
    },
  };

    events = {
      select(event) {
        const { nodes, edges } = event;
      },
    };

    render() {
      return (
        <div>
          <Graph graph={this.getGraph()} options={this.options} events={this.events} style={{ height: '800px' }} />
        </div>
      );
    }
}

export default withRouter(Vis);
