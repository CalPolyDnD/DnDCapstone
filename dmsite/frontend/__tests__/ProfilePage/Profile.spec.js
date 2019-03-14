import 'jsdom-global/register';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import { mount, configure } from 'enzyme';
import Profile from '../../src/Profile/ProfileComponent';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('Layout-Footer', () => {
	it('should render the component without errors', () => {
		const wrapper = mount(
			<MemoryRouter>
				<Profile />
			</MemoryRouter>,
		);
		expect(toJson(wrapper.find(Profile))).toMatchSnapshot();
	});
})