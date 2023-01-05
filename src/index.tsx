import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SuspenseLoading } from '@/components/Loading'
import zhCN from 'antd/es/locale/zh_CN'
import '@/styles/constants.sass'
import '@/styles/main.sass'
import '@/styles/atom.sass'
import '@/styles/ant_visiable.sass'
import reportWebVitals from './reportWebVitals'
import { ConfigProvider } from 'antd'
import Layout from '@/view/Layout'
import App from './App'
import Login from '@/view/Login'
import { store } from './store'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <BrowserRouter>
          <SuspenseLoading>
            <Routes>
              <Route path='/layout/*' key={'layout'} element={<Layout />} />
              <Route path='/' key={'main'} element={<App />} />
              <Route path='/login' key={'login'} element={<Login />} />
              <Route path='*' key={'404'} element={<div>404</div>} />
            </Routes>
          </SuspenseLoading>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
