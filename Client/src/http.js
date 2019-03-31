// 配置axios拦截器，统一处理所有的http请求和响应
import axios from 'axios';

const http = axios.create({
    // baseURL: baseURL
    // timeout: timeout
    // headers: headers
});

// http 请求拦截器
// 每次请求都为 http 头增加 Authorization 字段，其内容为 token
http.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// http响应拦截器
// 当响应的状态值为 401 Unauthorization 时，页面自动跳转到登录页面
http.interceptors.response.use(
    response => {
        let data = response.data;
        if(data.code === 200) {
            return data.data;
        }else if(data.code === 401) {
            window.location.href = '/login';
        }
        return data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default http;
