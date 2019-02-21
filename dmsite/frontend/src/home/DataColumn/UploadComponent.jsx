import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const Upload = () => (
  <div>
    <FilePond allowMultiple server="http://localhost:8000/home/upload/push_file" />
  </div>
);

export default Upload;
