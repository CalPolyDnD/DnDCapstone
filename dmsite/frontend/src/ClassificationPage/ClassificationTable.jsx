import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardHeader,
  Collapse,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { FileObject } from '../Model/FileObject';

class ClassificationTable extends React.Component {
  static defaultProps = {
    selectedClassificationIndex: 0,
    cellOnClick: () => {},
  }

  renderClassificationExamples(examples) {
    return examples.map(example => (
      <div style={{ height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <p style={{ margin: '5px', paddingLeft: '10px',  color: 'white' }}>
          {`${example}`}
        </p>
      </div>
    ));
  }

  renderFileCell() {
    const { file, selectedClassificationIndex, cellOnClick } = this.props;

    if (file.classifications === null) {
      return (<div />);
    }

    return file.classifications.map((classification, index) => (
      <div style={{ backgroundColor: '#3d3d3d' }}>
        <ListGroupItem tag="button" action className="justify-content-between" onClick={() => { cellOnClick(index); }}>{classification.name}</ListGroupItem>
        <Collapse isOpen={selectedClassificationIndex === index}>
          {this.renderClassificationExamples(classification.examples)}
        </Collapse>
      </div>
    ));
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
