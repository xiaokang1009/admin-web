import service from '@/utils/request'

/**
 * @description: 登录接口
 * @param data
 */

export const login = data => {
  return service({
    url: '/admin/login',
    method: 'post',
    data
  })
}

/**
 * @description: 获取用户信息
 * 根据token返回用户信息
 */
export const getUserInfo = () => {
  return service({
    url: '/admin/sys/user/info',
    method: 'get'
  })
}

export const getCaptcha = () => {
  return service({
    url: '/admin/captcha/img',
    method: 'get'
  })
}
