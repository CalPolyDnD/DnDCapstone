/**
 * Created by christinadaley on 1/17/19.
 */

import React from 'react';
import { Container, ListGroup, ListGroupItem, Card, CardBody, CardTitle, Button } from 'reactstrap';
import '/.style.css';

class Profile extends React.Component {

    render() {
        return (
            <div id="div">
                <Card id="card">
                    <h1 align="center"> Campaigns </h1>
                    <CardTitle className="pl-4 pt-4">{this.props.name}</CardTitle>
                    <CardBody>
                        <ListGroup align="center" className="campaign-list" flush>
                            <ListGroupItem>Campaign 1</ListGroupItem>
                            <ListGroupItem>Campaign 2</ListGroupItem>
                            <ListGroupItem>Campaign 3</ListGroupItem>
                        </ListGroup>
                        <Button color="primary"size="md" className="btn-block mt-0">Create New Campaign</Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Profile;