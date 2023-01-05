// 判断用户是否登录
export const getToken = () => {
  return document.cookie.split('jwt=').length > 1
}

// 清楚token
export const clearToken = () => {
  document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
