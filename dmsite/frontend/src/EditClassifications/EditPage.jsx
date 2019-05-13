import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Input,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { Spin, Icon } from 'antd';
import axios from 'axios';

const GET_URL = 'http://localhost:8000/get_classifications';
const SAVE_URL = 'http://localhost:8000/save_classifications';

class EditClassifications extends React.Component {
    constructor(props) {
      super(props);

      this.state ={
        file: [],
        selectedCellIndex: -1,
        isSaving: false,
      }

      this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        const { location } = this.props;
        const names = location.search.replace('?=', '').split(',');
        const body = {
            campaign: names[0],
            filename: names[1],
        };
        fetch(GET_URL, {
            method: 'POST',
            body: JSON.stringify(body),
        }).then(data => data.json()).then((result) => {
            let newResult = result;
            for (let i = 0; i < newResult.classifications.length; i++) {
                newResult.classifications[i].oldName = newResult.classifications[i].name;
            }
            console.log(newResult)
            this.setState({ file: newResult });
          });
    }

    handleTextChange(event, index) {
      let classifications = this.state.file.classifications;
      classifications[index].name = event.target.value;
      this.forceUpdate(); //TODO: maybe move the file object to the state instead of the props
    }

    switchIndex(index) {
        this.setState({ selectedCellIndex: index});
    }

    renderExamples(classification) {
        return classification.examples.map(example => (
          <div style={{ height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <p style={{ margin: '5px', paddingLeft: '30px',  color: '#898989' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`${example}`}
            </p>
          </div>
        ));
    }

    renderFileList(classifications) {
        const cell = this.state.selectedCellIndex;
        return classifications.map((classification, index) => {
            return (
                <div style={{ backgroundColor: '#3d3d3d' }}>
                    <ListGroupItem
                        tag="button"
                        action
                        className="justify-content-between"
                        onClick={() => {this.switchIndex(index)}}
                        style={{ color: 'white', backgroundColor: '#3d3d3d', fontSize: '110%' }}
                    >
                      <Input style={{ width: '100%', float:'left' }} type="text" value={classification.name} onChange={(event) => {this.handleTextChange(event, index)}} />
                    </ListGroupItem>
                    <Collapse
                        isOpen={cell === index}
                        style={{backgroundColor: '#3d3d3d' }}
                    >
                    <p style={{ margin: '5px', paddingLeft: '30px',  color: '#898989' }}>
                      Examples:
                    </p>
                    {this.renderExamples(classification)}
                    </Collapse>
                </div>
            );
        });

    }

    onSave() {
      const { file } = this.state;
      const body = {
        files: file
      };
      this.setState({isSaving: true});
      fetch(SAVE_URL, {
        method: 'POST',
        body: JSON.stringify(body),
      }).then(data => {
        this.props.history.push('/home/' + file.campaign);
      });
    }

  renderSaveButton() {
    const { isSaving } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    const buttonMsg = isSaving ? <Spin indicator={antIcon} /> : 'Save';
    return (
      <div style={{ justifyContent: 'center', paddingTop: '4%' }}>
        <Button
          color="primary"
          onClick={this.onSave}
          className="mr-0 btn-block mt-2 mb-2"
        >
          {buttonMsg}
        </Button>
      </div>
    );
  }

    render() {
        const { file } = this.state;
        if (file.length === 0) {
           return (
             <div />
           )
        }

        return (
          <div style={{display: 'flex', justifyContent: 'center'}}>
              <Card style={{ borderWidth: 0, height: '100%', width: '50%'}}>
                <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white' }}>File: {file.filename}</CardHeader>
                <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
                  <ListGroup flush>
                    {this.renderFileList(file.classifications)}
                  </ListGroup>
                  {this.renderSaveButton()}
                </CardBody>
              </Card>
          </div>
        );
    }
}

export default EditClassifications;

/*
const filelist = {
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
};
*/