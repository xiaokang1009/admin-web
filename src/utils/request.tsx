import axios from 'axios'
import useStore from '@/store/userSlice'
import { message, Modal } from 'antd'
import { useHref, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { clearToken } from './token'

const service = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 9000,
  withCredentials: true
})

service.interceptors.request.use(
  req => {
    req.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      ...req.headers
    }
    return req
  },
  error => {
    message.error({ content: error, key: 'error' })
    return error
  }
)
service.interceptors.response.use(
  res => {
    if (res.data.status === 0) {
      return res.data
    } else {
      message.error({ content: res.data.msg, key: 'error' })
      if (res.data.status === 10002) {
        clearToken()
        useNavigate()('/login')
      }
      return res.data.msg ? res.data : res
    }
  },
  error => {
    if (!error.response) {
      message.error({ content: '检查到请求错误', key: 'error' })
      return
    }
    if (error.response.status) {
      message.error({ content: `检测到接口错误${error}`, key: 'error' })
      return
    }
  }
)

export default service
