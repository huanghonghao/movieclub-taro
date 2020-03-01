import Taro from '@tarojs/taro'
import {getToken} from "./authority";

const codeMessage = {
  401: '没有访问权限',
  500: '服务器开小差了，请稍后再试'
};

function updateStorage(data = {}) {
  return Promise.all([
    Taro.setStorage({ key: 'token', data: data['3rdSession'] || '' }),
    Taro.setStorage({ key: 'uid', data: data['uid'] || ''})
  ])
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function request(options) {
  const { url, payload, method = 'GET', showToast = true, ...restOptions } = options;
  const token = await getToken();
  const header = token ? { 'WX-PIN-SESSION': token, 'X-WX-3RD-Session': token } : {};
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header,
    ...restOptions
  }).then(async (res) => {
    const { data, success } = res.data;
    if(success) return data;
    // return res.data
  }).catch((err) => {
    const defaultMsg = codeMessage[err.code] || '请求异常' ;
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || defaultMsg,
        icon: 'none'
      })
    }

    return Promise.reject({ message: defaultMsg, ...err })
  })
}
