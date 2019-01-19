import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Input, Button } from 'reactstrap';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Upload from './UploadComponent';

class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.uploadPressed = this.uploadPressed.bind(this);
    this.state = {
      uploading: false,
    };
  }

  uploadPressed = (bool) => {
    this.setState({
      uploading: bool,
    });
  }

  render() {
    return (
      <div>
        <Input placeholder="Search Result" />
        <div className="d-flex justify-content-center pt-2">
          <Button block="false" color="primary" size="md" className="mr-1 btn-block mt-0" onClick={this.uploadPressed.bind(null, true)}>Add File</Button>
          <Button color="primary" size="md" className="btn-block mt-0">Classify Me</Button>
        </div>
        {this.state.uploading && <Upload /> }
        {this.state.uploading && <Button close onClick={this.uploadPressed.bind(null, false)} />}
      </div>
    );
  }
}
export default withRouter(FilterButton);
