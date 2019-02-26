import React from 'react';
import _ from 'lodash';
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  Card,
  CardBody,
  Collapse,
  CardHeader,
  Form,
  FormGroup,
  Input,
  ListGroup,
} from 'reactstrap';
import SearchResultsCell from './SearchResultsCell';

class SearchResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterSectionCollapse: false,
      filterTags: this.getFilterTagFromRoutePath(),
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  getFilterTagFromRoutePath() {
    const prefix = _.get(this.props.location.pathname.split('/'), '[2]', '');

    const searchString = this.props.location.search.replace('?=', '');

    if (searchString) {
      return [{
        type: prefix,
        value: searchString,
      }];
    }
    return [];
  }

  toggleCollapse() {
    this.setState(prevState => ({
      filterSectionCollapse: !prevState.filterSectionCollapse,
    }));
  }

  addFilterTag(type, value) {
    if (!value) {
      return;
    }

    const newTag = {
      type,
      value,
    };
    this.setState(prevState => ({
      filterTags: [...prevState.filterTags, newTag],
    }));
  }

  removeFilterTag(index) {
    const filterTagsCopy = [...this.state.filterTags];
    filterTagsCopy.splice(index, 1);
    this.setState({ filterTags: filterTagsCopy });
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
        <SearchResultsCell dataset={result} history={this.props.history} />
    ));
  }

  renderFilterTags() {
    const xIcon = '\u2A09';
    return this.state.filterTags.map((tag, index) => (
      <Button id="filterTag" color="secondary" size="sm" style={{ marginLeft: '.25rem' }} onClick={(index) => { this.removeFilterTag(index); }}>
        {`${xIcon} ${tag.type}: ${tag.value}`}
      </Button>
    ));
  }

  renderFilterTagSection() {
    if (this.state.filterTags === undefined || this.state.filterTags.length === 0) {
      return (null);
    }
    return (
      <Card style={{ marginBottom: '.5rem' }}>
        <CardBody style={{ padding: '.5rem' }}>
          {this.renderFilterTags()}
        </CardBody>
      </Card>
    );
  }

  renderFilterSectionForms(fieldName) {
    let text = '';
    return (
      <div>
        { /* <Label for={`${fieldName}FilterField`}>{fieldName}</Label> */ }
        <Form inline style={{ marginBottom: '.5rem' }} display="flex" paddingTop="30">
          <FormGroup backgroundColor="#3d3d3d">
            <Input
              id={`${fieldName}FilterField`}
              type="text"
              style={{ backgroundColor: '#303030', borderWidth: 0 }}
              placeholder={`Dataset ${fieldName}`}
              onChange={(event) => { text = event.target.value; }}
            />
            <Button
              color="primary"
              onClick={() => { this.addFilterTag(fieldName, text); }}
            >
              Add
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }

  renderFilterSection() {
    const caretDirection = this.state.filterSectionCollapse ? 'up' : 'down';

    return (
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', paddingTop: '3%' }}>
        {this.renderFilterTagSection()}
        <div onClick={this.toggleCollapse}>
          <ButtonDropdown direction={caretDirection} isOpen={this.state.filterSectionCollapse} toggle={() => {}} style={{ marginBottom: '.5rem' }}>
            <DropdownToggle caret color="link">
              FILTER
            </DropdownToggle>
          </ButtonDropdown>
        </div>
        <Collapse isOpen={this.state.filterSectionCollapse}>
          {this.renderFilterSectionForms('Name')}
          {this.renderFilterSectionForms('Classification')}
          {this.renderFilterSectionForms('Attribute')}
        </Collapse>
      </div>
    );
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ borderWidth: 0, backgroundColor: '#3d3d3d', width: '60%' }}>
          <CardHeader
            tag="h3"
            align="center"
            style={{ backgroundColor: '#303030', color: 'white' }}
          >
            Search Results
          </CardHeader>
            {this.renderFilterSection()}
            <ListGroup style={{ borderWidth: 0 }}>
              {this.renderSearchResults()}
            </ListGroup>
        </Card>
      </div>
    );
  }
}

export default SearchResultsPage;
