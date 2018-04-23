import axios from 'axios';

export function get(url,params){
    return new Promise((resolve,reject) => {
      axios.get(url,{
        params:params,
       
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
    })
  }
  export function put(url,params){
    return new Promise((resolve,reject) => {
      axios.put(url,{
        params:params,
       
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
    })
  }