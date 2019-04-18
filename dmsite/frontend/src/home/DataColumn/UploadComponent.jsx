import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const UPLOAD_URL = 'http://localhost:8000/home/upload/push_file';

function Upload(props){
  return (
    <div>
      <FilePond
        allowMultiple
        style={{ backgroundColor: 'black', color: 'white' }}
        server={{
          url: UPLOAD_URL,
          process: {
            headers: {
              campaign: props.campaignName,
            },
          },
        }}
      />
    </div>
  );
}

export default Upload;
