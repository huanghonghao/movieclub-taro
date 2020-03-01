import Taro from '@tarojs/taro'

const TOKEN_NAME = 'token';

export function getToken() {
  return Taro.getStorage({ key: TOKEN_NAME }).then(res => res.data).catch(() => '')
}

export function setToken(token) {
  Taro.setStorage({ key: TOKEN_NAME, data: token })
}

export function getCurrentUser() {
  return {}
}

export function setCurrentUser(account) {
  // TODO
}

export function removeAll() {
  Taro.removeStorage({ key: TOKEN_NAME })
}
