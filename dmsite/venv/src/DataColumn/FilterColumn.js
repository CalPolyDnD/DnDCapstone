import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import FilterButton from './FilterButton';

class FilterColumn extends Component {

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
        <Card>
            <CardTitle className="pl-4 pt-4">{this.props.name}</CardTitle>
            <CardBody>
                <ListGroup className="filter-list" flush>
                  {DynamicData}
                    <ListGroupItem>
                                    </ListGroupItem>
                  </ListGroup>
                  <FilterButton/>
            </CardBody>
        </Card>
    )
   }
}

export default FilterColumn;
