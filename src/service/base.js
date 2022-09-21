import axios from 'axios'

// 接口响应成功的 code 值
const ERR_OK = 0
const baseURL = '/'

axios.defaults.baseURL = baseURL

// 封装 get 请求
export function get(url, params) {
  return axios
    .get(url, {
      params,
    })
    .then((res) => {
      const serviceData = res.data
      if (serviceData.code === ERR_OK) {
        return serviceData.result
      }
    })
    .catch((e) => {
      console.log('axios', e)
    })
}
