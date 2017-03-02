import axios from "axios";

const config = require('config');

export function initConfig() {
  // 配置axios
  axios.defaults.baseURL = config.service.baseUrl;
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  // 响应的拦截器
  axios.interceptors.response.use(function (response) {
    // 如果是成功的消息，那么减少数据嵌套
    if (response.data && response.data.data && response.data.code === 0) {
      response.data = response.data.data;
    }

    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  //console.log('axios config', axios.defaults);
}

export default axios;
