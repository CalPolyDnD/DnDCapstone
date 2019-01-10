import React from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import SearchResultsCell from './SearchResultsCell';

class SearchResultsPage extends React.Component {
  renderSearchHeader() {
    const searchString = this.props.location.pathname.split('/')[2];

    return (
      <h3 id="header">
        {`Search - ${searchString}`}
      </h3>
    );
  }

  renderSearchResults() {
    // TODO: replace dummy data with actual data from backend
    const searchResults = [
      {
        name: 'result1',
        classifications: ['a', 'b', 'c'],
        attributes: ['z', 'x', 'y'],
      },
      {
        name: 'result2',
        classifications: ['dogs', 'are', 'cute'],
        attributes: ['apple', 'banana', 'orange'],
      },
      {
        name: 'result3',
        classifications: ['larry', 'hu\'s', 'dog'],
        attributes: ['cap', 'stone', 'y'],
      },
    ];
    return searchResults.map(result => (
      <ListGroupItem>
        <SearchResultsCell dataset={result} />
      </ListGroupItem>));
  }

  render() {
    return (
      <Container>
        {this.renderSearchHeader()}
        <ListGroup>
          {this.renderSearchResults()}
        </ListGroup>
      </Container>
    );
  }
}

export default SearchResultsPage;
