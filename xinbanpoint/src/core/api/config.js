require('es6-promise').polyfill();

import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.baseURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// request拦截器
axios.interceptors.request.use(
    config => config,
    error => error
)

// response拦截器
axios.interceptors.response.use(
    response => response,
    error => error
)

export default axiosInstance;
