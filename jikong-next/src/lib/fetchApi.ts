//@ts-nocheck
import Cookies from 'js-cookie'
import qs from 'qs'
import { message } from 'antd'
import { API_BASE_URL } from './constants'
// qs get请求解析json字符串或转换成json字符串
const { stringify, parse } = qs

const checkStatus = (res) => {
  if (200 >= res.status < 300) {
    return res
  }
  message.warning(`网络请求错误,${res.status}`)
  const error = new Error(res.statusText)
  error.response = error
  throw error
}

/**
 *  捕获成功登录过期状态码等
 * @param res
 * @returns {*}
 */
const judgeOkState = async (res) => {
  const cloneRes = await res.clone().json()

  //TODO:可以在这里管控全局请求
  if (!!cloneRes.code && cloneRes.code !== 200) {
    message.warning(`${cloneRes.msg}${cloneRes.code}`)
  }
  return res
}

/**
 * 捕获失败
 * @param error
 */
const handleError = (error) => {
  if (error instanceof TypeError) {
    message.warning(`网络请求失败！${error}`)
  }
  return {
    //防止页面崩溃，因为每个接口都有判断res.code以及data
    code: -1,
    data: false,
  }
}

class http {
  /**
   *静态的fetch请求通用方法
   * @param url
   * @param options
   * @returns {Promise<unknown>}
   */
  static async staticFetch(url = '', options = {}) {
    // const jwt = Cookies.get('jwt') ?? ''

    const defaultOptions = {
      /*允许携带cookies*/
      credentials: 'include',
      /*允许跨域**/
      mode: 'cors',
      headers: {
        // Authorization: `Bearer ${jwt}`,
        // 当请求方法是POST，如果不指定content-type是其他类型的话，默认为如下，要求参数传递样式为 key1=value1&key2=value2，但实际场景以json为多
        // 'content-type': 'application/x-www-form-urlencoded',
      },
    }
    if (options.method === 'POST' || 'PUT') {
      defaultOptions.headers['Content-Type'] = 'application/json; charset=utf-8'
    }
    const newOptions = { ...defaultOptions, ...options }
    // console.log('newOptions', newOptions)

    return fetch(`${API_BASE_URL}${url}`, newOptions)
      .then(checkStatus)
      .then(judgeOkState)
      .then((res) => res.json())
      .catch(handleError)
  }

  /**
   *post请求方式
   * @param url
   * @returns {Promise<unknown>}
   */
  post(url, params = {}, option = {}) {
    const options = Object.assign({ method: 'POST' }, option)
    //一般我们常用场景用的是json，所以需要在headers加Content-Type类型

    options.body = JSON.stringify(params)

    //可以是上传键值对形式，也可以是文件，使用append创造键值对数据
    if (options.type === 'FormData' && options.body !== 'undefined') {
      let params = new FormData()
      for (let key of Object.keys(options.body)) {
        params.append(key, options.body[key])
      }
      options.body = params
    }
    return http.staticFetch(url, options) //类的静态方法只能通过类本身调用
  }

  /**
   * put方法
   * @param url
   * @returns {Promise<unknown>}
   */
  put(url, params = {}, option = {}) {
    const options = Object.assign({ method: 'PUT' }, option)
    options.body = JSON.stringify(params)
    return http.staticFetch(url, options) //类的静态方法只能通过类本身调用
  }

  /**
   * get请求方式
   * @param url
   * @param option
   */
  get(url, params = {}, option = {}) {
    const options = Object.assign({ method: 'GET' }, option)
    const paramstr = stringify(params)
    const fullpath = paramstr ? `${url}?${paramstr}` : url
    return http.staticFetch(fullpath, options)
  }
}

const fetchApi = new http() //new生成实例
// export const { post, get, put } = fetchApi;
export default fetchApi
