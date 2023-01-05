import { FC, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { getToken } from '@/utils/token'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { asyncMenu } from './api/menu'
import { map } from 'ramda'
import { routersProps, routesProps, setAsyncRoutes } from './store/routerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from './api/user'
import { setUserInfo } from './store/userSlice'
const App: FC = () => {
  if (!getToken()) {
    return <Navigate to='/login' replace />
  }

  return <Navigate to='/layout' replace />
}
export default App
