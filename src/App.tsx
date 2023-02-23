import { FC, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { getToken } from '@/utils/token'
import './App.css'
import { Navigate } from 'react-router-dom'
const App: FC = () => {
  if (!getToken()) {
    return <Navigate to='/login' replace />
  }

  return <Navigate to='/layout' replace />
}
export default App
