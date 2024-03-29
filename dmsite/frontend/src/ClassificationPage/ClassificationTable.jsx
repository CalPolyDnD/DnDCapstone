import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Input,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { FileObject } from '../Model/FileObject';

class ClassificationTable extends React.Component {
  static defaultProps = {
    selectedClassificationIndex: 0,
    cellOnClick: () => {},
  }

  handleChange = (event, index) => {
    let classifications = this.props.file.classifications;
    if (event.target.checked === true)
      classifications[index].is_sensitive = 1;
    else
      classifications[index].is_sensitive = 0;
  }

  handleTextChange = (event, index) => {
    let classifications = this.props.file.classifications;
    classifications[index].name = event.target.value;
    this.forceUpdate(); //TODO: maybe move the file object to the state instead of the props
  }

  renderColumns(columns) {
      let columnStr = "";
      for (let i = 0; i < columns.length - 1; i++) {
        columnStr += columns[i] + ", ";
      }
      columnStr += columns[columns.length - 1];

      return (
        <p style={{ margin: '5px', paddingLeft: '30px',  color: '#d6d7d8' }}>
          Column: {columnStr}
        </p>
      );
  }

  renderClassificationExamples(examples) {
    return examples.map(example => (
      <div style={{ height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <p style={{ margin: '5px', paddingLeft: '30px',  color: '#d6d7d8' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`${example}`}
        </p>
      </div>
    ));
  }

  renderFileCell() {
    const { file, selectedClassificationIndex, cellOnClick} = this.props;

    if (file.classifications === null) {
      return (<div />);
    }
    return file.classifications.map((classification, index) => {

      return (
          <div style={{ backgroundColor: '#3d3d3d' }}>
            <ListGroupItem
                tag="button"
                action
                className="justify-content-between"
                onClick={() => { cellOnClick(index); }}
                style={{ color: 'white', backgroundColor: '#3d3d3d', fontSize: '110%' }}
            >
              <div stype={{ height: '80px'}}>
                <Input style={{ width: '80%', float:'left' }} type="text" value={classification.name} onChange={(event) => {this.handleTextChange(event, index)}} />
                <div style={{ float:'right' }} >
                  <p style={{ margin: '2px', float:'top right' }}>Sensitive</p>
                  <Input style={{ margin: '2px', float:'bottom right' }} type="checkbox" onChange={(event) => {this.handleChange(event, index)}} />
                </div>
              </div>
            </ListGroupItem>
            <Collapse
                isOpen={selectedClassificationIndex === index}
                style={{backgroundColor: '#3d3d3d' }}
            >
              {this.renderColumns(classification.columns)}
              {this.renderClassificationExamples(classification.examples)}
            </Collapse>
          </div>
      );
    });
  }

  render() {
    return (
      <Card style={{ borderWidth: 0, height: '100%' }}>
        <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white' }}>Classifications</CardHeader>
        <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
          <ListGroup flush>
            {this.renderFileCell()}
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

ClassificationTable.propTypes = {
  file: PropTypes.shape(FileObject).isRequired,
  selectedClassificationIndex: PropTypes.number,
  cellOnClick: PropTypes.func,
};

export default ClassificationTable;
