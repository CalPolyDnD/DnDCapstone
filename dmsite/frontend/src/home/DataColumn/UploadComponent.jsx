import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const CAMPAIGN = "test_campaign";

const Upload = () => (
  <div>
    <FilePond allowMultiple server={{
            url: "http://localhost:8000/home/upload/push_file",
            process: {
                headers: {
                    "campaign": CAMPAIGN
                }
            }
    }} />
  </div>
);

export default Upload;
