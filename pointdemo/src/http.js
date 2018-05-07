import axios from 'axios';
const  instance = axios.create({
  baseURL: '/api/v2/integral/',
  // baseURL:'""'  //打包需要置空
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
