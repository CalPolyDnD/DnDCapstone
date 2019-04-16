import React from 'react';
import renderer from 'react-test-renderer';
import Campaign from '../../src/CampaignPage/Campaign';

it('renders correctly', () => {
  const tree = renderer
    .create(<Campaign />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
