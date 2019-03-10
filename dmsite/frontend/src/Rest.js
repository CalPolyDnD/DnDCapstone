import axios from 'axios';

const BASE_URL = 'http://localhost:8000';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

export default class Rest {
  static request = (method, url, body, success, failure) => {
    const config = {
      baseURL: BASE_URL,
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
