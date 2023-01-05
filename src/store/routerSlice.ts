import { importElement } from './../utils/index'
/**
 * 全局路由管理
 */
import { createSlice } from '@reduxjs/toolkit'

const routerListArr: any[] = []
const notLayoutRouterArr: any[] = []
const keepAliveRouterArr: any[] = []

export type routesProps = {
  name?: string
  path?: string
  meta: {
    btns?: any
    hidden?: boolean
    defaultMenu?: boolean
    title?: string
    closeTab?: string
    keepAlive?: boolean
  }
  redirect?: string
  children?: routesProps[]
  hidden?: boolean
  btns?: any
  component?: any
  element?: any
}

const formatRouter = (routes: routesProps[], routeMap: Map<string, routesProps> = new Map()) => {
  routes &&
    routes.forEach(item => {
      if (
        !item.children ||
        (item.children.every(ch => ch.hidden) && item.name !== '404' && !item.hidden && item)
      ) {
        routerListArr.push({ label: item?.meta?.title, value: item?.name })
      }
      item.meta.btns = item.btns
      item.meta.hidden = item.hidden
      if (item.meta.defaultMenu === true) {
        notLayoutRouterArr.push({ ...item, path: `/${item.path}` })
      } else {
        if (item.name) {
          routeMap.set(item.name, item)
        }
        if (item.children && item.children.length > 0) {
          formatRouter(item.children, routeMap)
        }
      }
    })
}

const keepAliveFilter = routes => {
  routes &&
    routes.forEach(item => {
      if ((item.children && item.children.some(ch => ch.meta.keepAlive)) || item.meta.keepAlive) {
        item.component &&
          item.component().then(val => {
            keepAliveRouterArr.push(val.default.name)
          })
      }
      if (item.children && item.children.length > 0) {
        keepAliveFilter(item.children)
      }
    })
}

export type routersProps = {
  asyncRoutes: Array<routesProps>
  routerList: any[]
}

const initialState: routersProps = {
  asyncRoutes: [],
  routerList: []
}
export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setAsyncRoutes: (state, action) => {
      formatRouter(action.payload)
      state.asyncRoutes = importElement(action.payload)
      state.routerList = routerListArr
    }
  }
})

export const { setAsyncRoutes } = routerSlice.actions
export default routerSlice.reducer
