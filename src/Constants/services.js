import axios from 'axios';
import shajs from 'sha.js';
import { message } from 'antd';
import constants from './constants';
import {getCookie} from '../Pages/Login/CookieMethods';

const userServiceInstance = axios.create({
  baseURL: constants.USER,
  timeout: 30000,
});

const rewardsServiceInstance = axios.create({
  baseURL: constants.REWARDS,
  timeout: 30000,
})

const checkupServiceInstance = axios.create({
  baseURL: constants.CHECKUP,
  timeout: 3000,
})

const requestInterceptor = (config) => {
  config.headers = {
  };
  // delete copyConfig.data;
  return config;
}


const requestInterceptorError = (error) => {
  console.log(error);
  return Promise.reject(error);
}

const responseInterceptor = (res) => res;

const responseInterceptorError = (error) => {
  message.error(error.response.data.message);
  return Promise.reject(error);
}


userServiceInstance.interceptors.request.use(requestInterceptor, requestInterceptorError);

userServiceInstance.interceptors.response.use(responseInterceptor, responseInterceptorError);

rewardsServiceInstance.interceptors.request.use(requestInterceptor, requestInterceptorError);

rewardsServiceInstance.interceptors.response.use(responseInterceptor, responseInterceptorError);

checkupServiceInstance.interceptors.request.use(requestInterceptor, requestInterceptorError);

checkupServiceInstance.interceptors.response.use(responseInterceptor, responseInterceptorError);


export { userServiceInstance, rewardsServiceInstance, checkupServiceInstance };
