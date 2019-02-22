import 'jsdom-global/register';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import { mount, configure } from 'enzyme';
import Header from '../../src/Header/Header';
import LoginHeader from '../../src/Header/LoginHeader';
import StandardHeader from '../../src/Header/StandardHeader';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('Layout-Footer', () => {

    it('Header with authentication should render the component without errors', () => {

        const wrapper = mount(
            <MemoryRouter>
                <Header isAuthenticated={true} />
            </MemoryRouter>,
        );
        expect(toJson(wrapper.find(Header))).toMatchSnapshot();
    });
    it('Header without authentication should render the component without errors', () => {

        const wrapper = mount(
            <MemoryRouter>
                <Header isAuthenticated={false} />
            </MemoryRouter>,
        );
        expect(toJson(wrapper.find(Header))).toMatchSnapshot();
    });
    it('should render the component without errors', () => {
        const wrapper = mount(
            <MemoryRouter>
                <LoginHeader/>
            </MemoryRouter>,
        );
        expect(toJson(wrapper.find(LoginHeader))).toMatchSnapshot();
    });
    it('should render the component without errors', () => {
        const wrapper = mount(
            <MemoryRouter>
                <StandardHeader />
            </MemoryRouter>,
        );
        expect(toJson(wrapper.find(StandardHeader))).toMatchSnapshot();
    });
})




