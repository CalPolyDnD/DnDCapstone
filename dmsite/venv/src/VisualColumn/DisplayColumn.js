import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import VisualDisplay from './VisualDisplay';
import VisualModal from './VisualModal';

class DisplayColumn extends Component {

state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

parseData(data) {
    const parsedData = data.map(name => {

            return (
                <ListGroupItem>
                    {name}
                </ListGroupItem>

            )
        })
     return parsedData;
}
render() {
return (
    <div>
        <Card>
            <CardTitle className="pl-4 pt-4">{this.props.name}</CardTitle>
                <CardBody>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-center pt-2">
                                <VisualModal/>
                                  <Button color="primary" size="md" className="mr-1 btn-block mt-0" onClick={this.uploadPressed}>TABLE</Button>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-center pt-2">
                                  <Button color="primary" size="md" className="mr-1 btn-block mt-0" onClick={this.uploadPressed}>GRAPH</Button>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-center pt-2">
                                  <Button color="primary" size="md" className="mr-1 btn-block mt-0" onClick={this.uploadPressed}>SAVE</Button>
                            </div>
                        </CardBody>
                    </Card>

                </CardBody>
        </Card>
    </div>
    )
   }
}

export default DisplayColumn;
