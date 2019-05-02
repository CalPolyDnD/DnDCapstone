import React from 'react';
import renderer from 'react-test-renderer';
import ClassificationColumn from '../../src/home/ClassificationColumn/ClassificationColumn';

it('renders correctly with no classifications', () => {
  const file = {
    name: 'testFile',
    path: 'path',
    classifications: [],
    header: 'test header',
  };
  const component = renderer
    .create(<ClassificationColumn file={file} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly', () => {
  const file = {
    name: 'testFile',
    path: 'path',
    classifications: [],
    header: 'test header',
  };
  const component = renderer
    .create(<ClassificationColumn file={file} />);
  const instance = component.getInstance();
  expect(instance.isSensitive('1')).toBe('Sensitive!');
});
