import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class DatasetDetails extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="dataset-details-page">
				<div className="dataset-details-col">
					<div className="dataset-details-col-left">
						<h4> Classifications </h4>
						<ListGroup>
							<ListGroupItem> a </ListGroupItem>
							<ListGroupItem> b </ListGroupItem>
							<ListGroupItem> c </ListGroupItem>
							<ListGroupItem> d </ListGroupItem>
							<ListGroupItem> e </ListGroupItem>
						</ListGroup>
					</div>
					<div className="dataset-details-col-right">
						<h4> Classifications </h4>
						<ListGroup>
							<ListGroupItem> a </ListGroupItem>
							<ListGroupItem> b </ListGroupItem>
							<ListGroupItem> c </ListGroupItem>
							<ListGroupItem> d </ListGroupItem>
							<ListGroupItem> e </ListGroupItem>
						</ListGroup>
					</div>
				</div>
			</div>
		)
	}
}

export default DatasetDetails;