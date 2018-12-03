import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Input, Button } from 'reactstrap';

class FilterButton extends Component {
render() {
return (
        <div>
            <Input placeholder="Filter Campaign" />
            <div className="d-flex justify-content-center pt-2">
                <Button color="primary" size="md" className="mr-1 btn-block mt-0">Add</Button>
                <Button color="primary"size="md" className="btn-block mt-0">Edit Campaigns</Button>
            </div>
        </div>
    )
   }
}
export default FilterButton;