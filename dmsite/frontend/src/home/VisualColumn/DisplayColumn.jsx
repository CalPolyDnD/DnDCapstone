import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import PropTypes from 'prop-types';
import {
  Button,
} from 'reactstrap';
import VisualTableModal from './VisualTableModal';
import VisualGraphModal from './VisualGraphModal';

const DOWNLOAD_URL = 'http://localhost:8000/download_file';

class DisplayColumn extends Component {
  uploadPressed = () => {
    const { campaignName } = this.props;
    const body = {
      campaign_name: campaignName,
    };

    fetch(DOWNLOAD_URL, {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed...');
    }).then((data) => {
      const file = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(file);
      link.download = `${campaignName}_classifications`;
      link.click();
    }).catch((error) => {
      // TODO: handle errors here
    });
  }

  render() {
    return (
      <div className="d-flex justify-content-center pt-2">
        <VisualTableModal />
        <VisualGraphModal />
        <div>
          <Button
            color="primary"
            size="md"
            className="mr-1 btn-block mt-0"
            onClick={this.uploadPressed}
          >
            Download Campaign
          </Button>
        </div>
      </div>
    );
  }
}

DisplayColumn.propTypes = {
  campaignName: PropTypes.string.isRequired,
};

export default DisplayColumn;
