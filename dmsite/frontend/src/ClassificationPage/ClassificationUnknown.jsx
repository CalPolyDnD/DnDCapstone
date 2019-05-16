import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Input,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { Spin, Icon } from 'antd';
import axios from 'axios';


class Unknown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCellIndex: -1,
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderFileList = this.renderFileList.bind(this);
    }

    handleTextChange(event, index) {
      let unknowns = this.props.unknowns;
      unknowns[index].guess = event.target.value;
      this.forceUpdate(); //TODO: maybe move the file object to the state instead of the props
    }

    handleChange = (event, index) => {
      console.log(this.props.unknowns);
      let classifications = this.props.unknowns;
      if (event.target.checked === true)
        classifications[index].is_sensitive = 1;
      else
        classifications[index].is_sensitive = 0;
    }

    switchIndex(index) {
        this.setState({ selectedCellIndex: index });
    }

    renderExamples(classification) {    
        return classification.examples.map(example => (
          <div style={{ height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <p style={{ margin: '5px', paddingLeft: '30px',  color: '#898989' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`${example}`}
            </p>
          </div>
        ));
    }

    renderFileList() {
        const { unknowns } = this.props;
        const cell = this.state.selectedCellIndex;
        return unknowns.map((classification, index) => {
            return (
                <div style={{ backgroundColor: '#3d3d3d' }}>
                    <ListGroupItem
                        tag="button"
                        action
                        className="justify-content-between"
                        onClick={() => {this.switchIndex(index)}}
                        style={{ color: 'white', backgroundColor: '#3d3d3d', fontSize: '110%' }}
                    >
                      <div style={{ width: '80%', float: 'left' }}>
                        <p style={{ color: 'white' }}>
                          Guess:
                        </p>
                        <Input style={{ width: '100%', float:'left' }} type="text" value={classification.guess} onChange={(event) => {this.handleTextChange(event, index)}} />
                        <p style={{ paddingTop: '3px',  color: 'white' }}>
                          Original Column: {classification.columns[0]}
                        </p>
                      </div>
                      <div style={{ float:'right' }} >
                        <p style={{ margin: '2px', float:'top right' }}>Sensitive</p>
                        <Input style={{ margin: '2px', float:'bottom right' }} type="checkbox" onChange={(event) => {this.handleChange(event, index)}} />
                      </div>
                    </ListGroupItem>
                    <Collapse
                        isOpen={cell === index}
                        style={{backgroundColor: '#3d3d3d' }}
                    >
                    <p style={{ margin: '5px', paddingLeft: '30px',  color: '#898989' }}>
                      Examples:
                    </p>
                    {this.renderExamples(classification)}
                    </Collapse>
                </div>
            );
        });

    }

    render() {
        return (
          <div>
            <ListGroup flush>
              {this.renderFileList()}
            </ListGroup>
          </div>
        );
    }

}

export default Unknown;