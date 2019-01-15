import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Button, CardTitle, Card, CardBody, ListGroupItem, Table } from 'reactstrap';

class DisplayData extends Component {

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


const Testdata = ["String1", "String2", "String3", "String4"];

const DynamicData =  this.parseData(Testdata);

return (
            <Card>
                <CardTitle className="pl-4 pt-4">{this.props.name}-Header</CardTitle>
                <CardBody>
                    <p> This is a description of meta data on the individual file </p>
                    <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                        </tbody>
                      </Table>
                </CardBody>
                <Button onClick={this._handleClick} color="primary">Save and Download</Button>
            </Card>
    )
   }
}

export default DisplayData;
