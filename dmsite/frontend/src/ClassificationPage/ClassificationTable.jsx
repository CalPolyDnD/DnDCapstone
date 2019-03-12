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

  renderClassificationExamples(examples) {
    return examples.map(example => (
      <div style={{ height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <p style={{ margin: '5px', paddingLeft: '30px',  color: '#898989' }}>
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
        <ListGroupItem
            tag="button"
            action
            className="justify-content-between"
            onClick={() => { cellOnClick(index); }}
            style={{ color: 'white', backgroundColor: '#3d3d3d', fontSize: '110%' }}
        >
          {classification.name}
          <Input style={{ right: '10%'}} type="checkbox" onChange={(event) => {this.handleChange(event, index)}} />
        </ListGroupItem>
        <Collapse
            isOpen={selectedClassificationIndex === index}
            style={{backgroundColor: '#3d3d3d' }}
        >
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
