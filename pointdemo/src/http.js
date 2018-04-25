import axios from 'axios';
axios.defaults.baseURL = '/api/api/v2/integral/';
export function get(url, params) {
  console.log("get请求", url)
  return new Promise((resolve, reject) => {
    axios.get(url, {
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
    axios.put(url,data)
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
