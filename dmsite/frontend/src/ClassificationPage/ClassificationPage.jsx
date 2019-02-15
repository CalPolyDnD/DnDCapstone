import React, { Component } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import ClassificationInfo from './ClassificationInfo'

class ClassificationPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    // TODO: multiple tabs based on number of files
    const filename1 = "File number 1";
    const filename2 = "File number 2";
    return (
      <div>
        <h2> Results </h2>
        <div>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                    {filename1}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                    {filename2}
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <ClassificationInfo />
              </TabPane>
              <TabPane tabId="2">
                <ClassificationInfo />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassificationPage;
