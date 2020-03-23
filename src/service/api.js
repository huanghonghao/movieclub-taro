import { stringify } from 'qs';
import request from "../utils/request";

export async function movies(params) {
  return request({
    url: `/BDMovie/list?${stringify(params)}`,
  })
}

export async function detail(id) {
  return request({
    url: `/BDMovie/detail?${stringify({id})}`,
  })
}

export async function search(title) {
  return request({
    url: `/BDMovie/search?${stringify({title})}`
  })
}

export async function episodes(movieId) {
  return request({
    url: `/BDMovie/episodes?${stringify({movieId})}`
  })
}
