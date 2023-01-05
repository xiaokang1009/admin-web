import { Button, Modal, Spin } from 'antd'
import { Suspense } from 'react'
import Style from './index.module.sass'

export const Loading = () => {
  return (
    <div className={Style.rantion_loading} style={{ paddingTop: '20vh', minHeight: '80vh' }}>
      <Spin tip='Loading...' size='large' />
    </div>
  )
}
interface Props {
  children: JSX.Element
}

export const SuspenseLoading = ({ children }: Props) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

/**
 * 加载失败
 */
export const loadingError = () => {
  const reload = () => {
    localStorage.clear()
    location.reload()
  }
  const showConfirm = () => {
    Modal.confirm({
      title: '加载失败',
      content: '请刷新页面',
      okText: '刷新',
      cancelText: '取消',
      onOk: reload
    })
  }
  return (
    <div className={Style.rantion_loading}>
      <div className={Style.page404}>500</div>
      <div className={Style.subtitle}>很抱歉，程序出现异常了。</div>
      <br />
      <Button type='link' onClick={reload}>
        注销登录，重新加载
      </Button>
    </div>
  )
}
