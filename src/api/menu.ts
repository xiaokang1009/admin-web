import service from '@/utils/request'

/**
 * @Summary 用户登录 获取动态路由
 * @Produce application/json
 * @Router /menu/getMenu [post]
 */
export const asyncMenu = () => {
  return service({
    url: '/menu/getMenu',
    method: 'get'
  })
}
