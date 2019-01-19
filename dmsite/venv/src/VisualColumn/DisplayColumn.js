import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import VisualTableModal from './VisualTableModal';
import VisualGraphModal from './VisualGraphModal';

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
                                <VisualTableModal/>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-center pt-2">
                                  <VisualGraphModal/>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-center pt-2">
                                  <Button color="primary" size="md" className="mr-1 btn-block mt-0" onClick={this.uploadPressed}>Download Campaign </Button>
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
