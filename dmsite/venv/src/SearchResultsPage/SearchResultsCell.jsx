import React from 'react';
import { ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

class SearchResultsCell extends React.Component {
  render() {
    const dataset = this.props.dataset;
    return (
      <ListGroupItem>
        <h4>{dataset.name}</h4>
        <h6>{`Classifications: ${dataset.classifications.toString()}`}</h6>
        <h6>{`Attributes: ${dataset.attributes.toString()}`}</h6>
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
};

export default SearchResultsCell;
