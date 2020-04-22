import axios from 'axios';
const Qs = require('qs');
import router from '@/router';
import config from '@/util/config';
// 环境的切换
if (process.env.NODE_ENV == 'development') {
  // 开发模式下判断
  // config.$appMode === true 需要显示全部路径，不然在apicloud中调试会请求失败
  if (config.$appMode) {
    axios.defaults.baseURL = `${config.$baseUrl}/api`;
  } else {
    axios.defaults.baseURL = '/api';
  }
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = `${config.$baseUrl}/api`;
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = `${config.$baseUrl}/api`;
}

// 超时时间
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// 响应拦截
axios.interceptors.response.use(
  (response: any): any => {
    if (response.status === 200) {
      if (response.data.status === -1) {
        router.replace({
          path: 'Login',
        });
      } else {
        return Promise.resolve(response);
      }
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  (error: any): any => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求参数错误';
          break;
        case 401:
          error.message = '未授权，请登录';
          break;
        case 403:
          error.message = '跨域拒绝访问';
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网关错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        default:
          break;
      }
      return Promise.reject(error.response);
    }
  }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params?: object, files?: object) {
  return new Promise((resolve, reject) => {
    const nowUrl = axios.defaults.baseURL + url;
    if (config.$appMode) {
      //
      // @ts-ignore
      api.ajax(
        {
          url: nowUrl,
          method: 'get',
          data: {
            values: params,
          },
        },
        function(ret: any, err: any) {
          if (ret) {
            resolve(ret);
          } else {
            reject(err);
          }
        }
      );
    } else {
      axios
        .get(nowUrl, {
          params: Qs.stringify(params),
        })
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((err: any) => {
          if (err.statusCode === 0) {
            router.push('NoNetWork');
          } else {
            reject(err);
          }
        });
    }
  });
}
/**
 * post方法，对应请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: object, files?: object) {
  return new Promise((resolve, reject) => {
    const nowUrl = axios.defaults.baseURL + url;
    if (config.$appMode) {
      // @ts-ignore
      api.ajax(
        {
          url: nowUrl,
          method: 'post',
          timeout: 30,
          data: {
            values: params,
            files: files,
          },
        },
        (ret: any, err: any) => {
          if (ret) {
            resolve(ret);
          } else {
            if (err.statusCode === 0) {
              router.push('NoNetWork');
            } else {
              reject(err);
            }
          }
        }
      );
    } else {
      axios
        .post(nowUrl, Qs.stringify(params), files)
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((err: any) => {
          reject(err.data);
        });
    }
  });
}
