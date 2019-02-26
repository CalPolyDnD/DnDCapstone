import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default Rest {
  request = (method, url, body, success, failure) => {
    const config = {
      url: url,
      method: method,
      data: body,
      responseType: 'json',
    };
    axios.request(config).then((response) => {
      success(response);
    }).catch((err) => {
      failure(err);
    });
  }
}
