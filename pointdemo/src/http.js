import axios from 'axios';
const testurl = '/api';
const  instance = axios.create({
  //  baseURL: testurl+'/api/v2/integral/',
  baseURL: '/api/v2/integral/',
  // timeout: 10000,   
});
export function get(url, params) {
  console.log("get请求", url)
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
  })
}
export function put(url, data) {
  return new Promise((resolve, reject) => {
    console.log("put请求", url)
    instance.put(url,data)
    .then(response => {

      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
    // axios({
    //     method: 'put',
    //     url: url,
    //     data: JSON.stringify(data),
    //     ContentType:'application/json;charset=utf-8'
      
    //   }).then(response => {
    //     resolve(response.data);
    //   })
    //   .catch(err => {
    //     reject(err)
    //   })
  })
}
