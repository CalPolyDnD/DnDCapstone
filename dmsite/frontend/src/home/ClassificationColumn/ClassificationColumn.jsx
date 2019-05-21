import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import {
  Input, Card, Button, CardBody, ListGroup, ListGroupItem, CardHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { FileObject } from '../../Model/FileObject';

class ClassificationColumn extends Component {
  constructor(props) {
    super(props);
    this.editClick = this.editClick.bind(this);
  }

  _handleClick(e) {
    e.preventDefault();
  }

  isSensitive(val) {
    if (val === "1") {
        return "Sensitive!";
     }
    return "";
  }

  editClick() {
    let route = '/edit_classifications?=' + this.props.campaign + ',' + this.props.file.get_name();
    this.props.pushRoute(route);
  }

  renderClassificationCell() {
    const { file } = this.props;

    if (typeof file.classifications !== 'undefined')
      return file.classifications.map((obj, index) => {
        return (
          <ListGroupItem key={ index } style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
              <div>
                <p>{obj.name}</p>
                <p style={{ color: 'red', right: "10%"}}>{this.isSensitive(obj.is_sensitive)}</p>
              </div>
          </ListGroupItem>
      );
    });
    return null;
  };

  render() {
    return (
      <Card style={{ borderWidth: 0 }} id="classifications">
        <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white' }}>Classifications</CardHeader>
        <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
          <ListGroup flush>
            {this.renderClassificationCell()}
          </ListGroup>
          <Input
            placeholder="Search Classification"
            className="mt-3"
            style={{ backgroundColor: '#303030', borderWidth: 0 }}
          />
          <Button
            onClick={this.editClick}
            color="primary"
            className="mr-0 btn-block mt-2 mb-2"
          >
            Edit Classifications
          </Button>
        </CardBody>
      </Card>
    );
  }
}

ClassificationColumn.propTypes = {
  file: PropTypes.instanceOf(FileObject),
};

export default ClassificationColumn;
