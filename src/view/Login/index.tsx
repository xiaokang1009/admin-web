import { login } from '@/api/user'
import { setUserInfo } from '@/store/userSlice'
import { getToken } from '@/utils/token'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, message, Row, Space } from 'antd'
import Layout from 'antd/lib/layout'
import { FC, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { Captcha } from './captcha'

import styles from './login.module.sass'

/**
 * 登录页面
 */
const Login: FC = () => {
  if (getToken()) {
    return <Navigate to='/' replace />
  }
  const [captchaId, setCaptchaId] = useState<string>('')
  const [messageApi, contextHolder] = message.useMessage()
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const captchaRef = useRef<any>(null)
  const onFinish = (values: any) => {
    if (!validateCaptcha(values.captcha)) {
      // 验证码不匹配
      messageApi.open({ type: 'error', content: '验证码不匹配', duration: 2 })

      captchaRef.current?.handleClick()
      return false
    }
    // 登录
    login({ username: values.username, password: values.password }).then(res => {
      dispatch(setUserInfo(res.data.user))
      navigate('/')
    })
  }
  // 验证验证码是否匹配
  const validateCaptcha = (captcha: string) => {
    console.log(captchaId.toLocaleLowerCase(), captcha.toLocaleLowerCase())

    return captchaId.toLocaleLowerCase() === captcha.toLocaleLowerCase()
  }

  // 调用子组件的handleClick方法
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    captchaRef.current?.handleClick()
  }
  return (
    <Layout id='userLayout' className={styles.userLayout}>
      {contextHolder}
      <div className={styles.login_container}>
        <div className={`${styles.login_left} z-top`}>
          <i></i>
        </div>
        <div className={`${styles.login_form} z-top`}>
          <p className={`${styles.login_tips} f-w-bold t-italic`}>NEST-REACT-ADMIN</p>
          <Form
            layout={'horizontal'}
            name='normal_login'
            onFinish={onFinish}
            initialValues={{ username: 'admin', password: 'admin123456' }}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='用户名'
              />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='密码'
              />
            </Form.Item>
            <Form.Item name='captcha' rules={[{ required: true, message: '请输入验证码' }]}>
              <Row>
                <Col span={15}>
                  <Input placeholder='验证码' className={styles.captcha_input} />
                </Col>
                <Col span={9} className={styles.captcha}>
                  <Captcha
                    changeCaptcha={(captchaId: string) => {
                      setCaptchaId(captchaId)
                    }}
                    cRef={captchaRef}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button type={'primary'} htmlType={'submit'} className={styles.login_btn}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  )
}
export default Login
