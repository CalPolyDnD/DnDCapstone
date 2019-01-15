import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import FilterButton from './FilterButton';

class DisplayColumn extends Component {

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

const Testdata = ["File1.jsv", "File2.jsv", "File3.jsv", "File4.jsv"];

const DynamicData =  this.parseData(Testdata);

return (
    <div>
        <Card>
            <CardTitle className="pl-4 pt-4">{this.props.name}</CardTitle>
                <CardBody>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-center pt-2">
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
