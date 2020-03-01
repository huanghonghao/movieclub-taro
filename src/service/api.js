import request from "../utils/request";

export async function movies() {
  return request({
    url: 'http://192.168.1.135:8080/home/movies',
  })
}

export async function test() {

}
