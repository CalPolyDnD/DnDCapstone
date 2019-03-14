import React, { Component } from 'react';
import classnames from 'classnames';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  Spin,
} from 'antd';
import FileTab from './FileTab';
import './ClassificationInfo.css';

let FETCH_URL = 'http://localhost:8000/classify_files';
let SAVE_URL =  'http://localhost:8000/classify_files/save';

class ClassificationPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
      files: [],
    };
    this.campaignName = this.props.location.pathname.replace("/classification/", "");
  }

  componentDidMount() {
    const { location } = this.props;
    const fileNames = location.search.replace('?=', '').split(',');
    const formattedBody = fileNames.map(fileName => ({ filename: fileName }));

    fetch(FETCH_URL, {
      method: 'POST',
      body: JSON.stringify(formattedBody)
    }).then(data => data.json()).then((result) => {
      let files = result;
      files.map(file => { file.campaign = this.campaignName; });
      this.setState({ files: files });
      return ""; // needed for compiler
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onFinish = (completion) => {
    fetch(SAVE_URL, {
      method: 'POST',
      body: JSON.stringify(this.state.files)
    }).then(data => {
        completion();
        this.props.history.push('/home/' + this.campaignName);
    });
  }

  displayClassification(count) {
    const jsonObj = [];
    let pos = 0;
    const result = this.state.files[count];
    let labels = '';
    for (pos; pos < result.classifications.length; pos++) {
      labels = result.classifications[pos].columns[0];
      for (let i = 1; i < result.classifications[pos].columns.length; i++) {
        labels += `, ${ result.classifications[pos].columns[i]}`;
        jsonObj.push(
          <tr>
            <td>
              {result.classifications[pos].name}
            </td>
            <td>
              {labels}
            </td>
          </tr>,
        );
      }
    }

    return (
      <tbody>
        {jsonObj}
      </tbody>
    );
  }

  displayTabs() {
    const jsonObj = [];
    for (let count = 0; count < this.state.files.length; count++) {
      const color = this.state.activeTab == count ? '#007bff': 'rgb(0,0,0,0)'
      const result = this.state.files[count];
      jsonObj.push(
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === count })}
            onClick={() => { this.toggle(count); }}
            style={{ backgroundColor: color, color: 'white' }}
          >
            {result.filename}
          </NavLink>
        </NavItem>,
      );
    }
    return jsonObj;
  }

  tabInfo() {
    const { files } = this.state;
    const jsonObj = [];
    for (let count = 0; count < files.length; count++) {
      jsonObj.push(
        <TabPane tabId={count} >
          <FileTab file={files[count]} onFinish={this.onFinish} />
        </TabPane>,
      );
    }

    return jsonObj;
  }

  render() {
    if (!this.state.files.length) {
      return (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'center' }}>
          <Spin size="large" tip="Classifying files..." />
        </div>
      );
    }

    return (
      <div className="classification-page">
        <div>
          <Nav tabs>
            {this.displayTabs()}
          </Nav>
          <TabContent activeTab={this.state.activeTab} >
            {this.tabInfo()}
          </TabContent>
        </div>
      </div>
    );
  }
}

/*
const FAKE_RESPONSE = [
  {
      "filename": "MOCK_DATA.csv",
      "description": "test description",
      "classifications": [
          {
              "name": "lname",
              "columns": [
                  "first_name"
              ],
              "examples": [
                  "Cornell",
                  "Joseph",
                  "Pegeen",
                  "Janith",
                  "Cissiee"
              ]
          },
          {
              "name": "email",
              "columns": [
                  "email"
              ],
              "examples": [
                  "cnye0@sciencedirect.com",
                  "jdeverill1@whitehouse.gov",
                  "plerego2@amazon.co.jp",
                  "jpanons3@berkeley.edu",
                  "cmyhill4@newyorker.com"
              ]
          },
          {
              "name": "gender",
              "columns": [
                  "gender"
              ],
              "examples": [
                  "Male",
                  "Male",
                  "Female",
                  "Female",
                  "Female"
              ]
          },
          {
              "name": "ip_address",
              "columns": [
                  "ip_address"
              ],
              "examples": [
                  "171.95.103.238",
                  "173.130.94.151",
                  "108.48.103.4",
                  "34.27.99.66",
                  "28.172.195.129"
              ]
          },
          {
              "name": "phone",
              "columns": [
                  "phone"
              ],
              "examples": [
                  "128-612-4011",
                  "278-837-7782",
                  "353-423-4599",
                  "535-128-9172",
                  "717-836-1731"
              ]
          },
          {
              "name": "address",
              "columns": [
                  "address"
              ],
              "examples": [
                  "86 Mcbride Street",
                  "6620 Clarendon Road",
                  "5711 Troy Junction",
                  "32 Manley Alley",
                  "750 Corben Junction"
              ]
          },
          {
              "name": "ssn",
              "columns": [
                  "ssn"
              ],
              "examples": [
                  "608-45-8721",
                  "409-65-3396",
                  "204-67-8040",
                  "396-47-0769",
                  "691-91-8581"
              ]
          },
          {
              "name": "money",
              "columns": [
                  "ssn"
              ],
              "examples": [
                  "608-45-8721",
                  "409-65-3396",
                  "204-67-8040",
                  "396-47-0769",
                  "691-91-8581"
              ]
          }
      ]
  },
  {
      "filename": "MOCK_PEOPLE.csv",
      "classifications": [
          {
              "name": "lname",
              "columns": [
                  "fname"
              ],
              "examples": [
                  "Mendy",
                  "Lonnie",
                  "Tessie",
                  "Bartie",
                  "Isac"
              ]
          },
          {
              "name": "ip_address",
              "columns": [
                  "ip"
              ],
              "examples": [
                  "210.64.51.117",
                  "241.129.133.85",
                  "158.124.53.221",
                  "151.51.140.80",
                  "197.104.87.166"
              ]
          },
          {
              "name": "email",
              "columns": [
                  "email"
              ],
              "examples": [
                  "mpakenham0@ted.com",
                  "lstovell1@tinyurl.com",
                  "tmason2@jugem.jp",
                  "btullot3@google.com.hk",
                  "iwinkworth4@stumbleupon.com"
              ]
          },
          {
              "name": "gender",
              "columns": [
                  "gender"
              ],
              "examples": [
                  "Male",
                  "Male",
                  "Female",
                  "Male",
                  "Male"
              ]
          },
          {
              "name": "phone",
              "columns": [
                  "phone_num"
              ],
              "examples": [
                  "205-119-6280",
                  "802-846-4493",
                  "298-324-6343",
                  "829-765-9719",
                  "106-868-2944"
              ]
          },
          {
              "name": "address",
              "columns": [
                  "home_address"
              ],
              "examples": [
                  "687 Continental Drive",
                  "83745 Anthes Plaza",
                  "10 Spohn Crossing",
                  "72 Crowley Pass",
                  "13264 Dorton Plaza"
              ]
          },
          {
              "name": "ssn",
              "columns": [
                  "ssn"
              ],
              "examples": [
                  "862-67-7878",
                  "311-82-2110",
                  "756-80-9380",
                  "483-42-8822",
                  "528-32-8357"
              ]
          },
          {
              "name": "money",
              "columns": [
                  "ssn"
              ],
              "examples": [
                  "862-67-7878",
                  "311-82-2110",
                  "756-80-9380",
                  "483-42-8822",
                  "528-32-8357"
              ]
          }
      ]
  }
]; */
export default ClassificationPage;
