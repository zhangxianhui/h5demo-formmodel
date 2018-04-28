import axios from 'axios';
const testurl = '/api';
const  instance = axios.create({
  //  baseURL: testurl+'/api/v2/integral/',
  baseURL: '/api/v2/integral/',
 
});
export function get(url, params) {
  
  return new Promise((resolve, reject) => {
    instance.get(url, {
        params: params,

      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  });
}
export function put(url, data) {
  return new Promise((resolve, reject) => {

    instance.put(url,data)
    .then(response => {
      // console.error(response);
      resolve(response.data);
    })
    .catch(error => {
      reject(error)
    })
  });
}
