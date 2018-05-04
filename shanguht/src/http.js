import axios from 'axios';
// const  instance = axios.create({
//   baseURL: '/api/v2/holiday/',
// });
export function get(url, params) {
  
  return new Promise((resolve, reject) => {
    console.log("document.cookie====>",document.cookie)
    instance.get(url, {
        params: params,
      },
    )
    // instance({
    //   method: 'get',
    //   headers: {'Cookie' : document.cookie },
    //   url: url,
    //   params: params,
    // })
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
