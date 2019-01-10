import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Input, Button } from 'reactstrap';
import { Route } from "react-router-dom";
import Upload from './UploadComponent'
import { withRouter } from "react-router-dom";

class FilterButton extends Component {
    constructor(props){
        super(props);
        this.uploadPressed = this.uploadPressed.bind(this)
    }
    uploadPressed(){
        let path = '/upload'
        this.props.history.push(path)
    }
render() {
return (
        <div>
            <Input placeholder="Filter Campaign" />
            <div className="d-flex justify-content-center pt-2">
                <Button color="primary" size="md" className="mr-1 btn-block mt-0" onClick={this.uploadPressed}>Add</Button>
                <Button color="primary"size="md" className="btn-block mt-0">Edit {this.props.name}</Button>
            </div>
            <Route path='/upload' component={Upload} />
        </div>
    )
   }
}
export default withRouter(FilterButton);