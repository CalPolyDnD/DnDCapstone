/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import Vis from '../../Vis/Vis';

class VisualGraphModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const { campaign } = this.props;
    return (
      <div style={{ paddingRight: '5px', fontColor: 'white', color: 'white' }}>
        <Button color="primary" size="md" className="mr-1 btn-block mt-0" onClick={this.toggle}>Show Graph</Button>

        <Modal
          size="lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: '0'}}
        >
          <ModalHeader style={{backgroundColor: '#303030'}}/>
          <ModalBody style={{ backgroundColor: '#3d3d3d', color: 'white'}}>
            <Vis campaign={campaign} />
          </ModalBody>
          <ModalFooter style={{ backgroundColor: '#303030', color: 'white', borderWidth: '0' }}>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default VisualGraphModal;
