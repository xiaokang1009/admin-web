import { FC, useLayoutEffect } from 'react'
import type { RouteObject } from 'react-router'

import { getToken } from '@/utils/token'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { map } from 'ramda'
import { routesProps, setAsyncRoutes } from '@/store/routerSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getUserInfo } from '@/api/user'
import { setUserInfo } from '@/store/userSlice'
import { asyncMenu } from '@/api/menu'
export type RouteObjDto = RouteObject & {
  name: string
  meta?: { title: string }
}

const Layout: FC = () => {
  if (!getToken()) {
    return <Navigate to='/login' replace />
  }
  const routers = useSelector((state: any) => state.router.asyncRoutes)
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    async function request() {
      const menu = await asyncMenu()
      const userInfo = await getUserInfo()
      dispatch(setUserInfo(userInfo.data.user))
      dispatch(setAsyncRoutes(menu.data))
    }
    return () => {
      request()
    }
  }, [])
  return (
    <div className='Layout'>
      <h1>Layout</h1>
      <Link to='/layout/dashboard'>dashboard</Link>
      <Routes>
        {map((item: routesProps) => {
          return <Route key={item.name} path={`/${item.path}`} element={item.element} />
        }, routers)}
      </Routes>
    </div>
  )
}

export default Layout
