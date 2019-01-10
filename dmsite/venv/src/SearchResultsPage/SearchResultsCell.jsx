import React from 'react';
import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';
import PropTypes from 'prop-types';

class SearchResultsCell extends React.Component {
  render() {
    const dataset = this.props.dataset;
    // TODO: modify the onClick to route the the appropriate link
    return (
      <ListGroupItem action key={this.props.key} onClick={() => { this.props.history.push('/'); }}>
        <ListGroupItemHeading>{dataset.name}</ListGroupItemHeading>
        <ListGroupItemText>
          {`Classifications: ${dataset.classifications.toString()}`}
        </ListGroupItemText>
        <ListGroupItemText>
          {`Attributes: ${dataset.attributes.toString()}`}
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}

/* TODO: A class representing the result of the dataset should be created.
         Temperary using PropTypes.shape to define the shape but it should
         be switched over to PropTypes.instanceOf.
*/
SearchResultsCell.propTypes = {
  dataset: PropTypes.shape({
    name: PropTypes.string,
    classifications: PropTypes.array,
    attributes: PropTypes.array,
  }).isRequired,
  key: PropTypes.number.isRequired,
};

export default SearchResultsCell;
