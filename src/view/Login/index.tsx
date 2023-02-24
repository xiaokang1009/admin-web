import { getCaptcha, login } from '@/api/user'
import { setUserInfo } from '@/store/userSlice'
import { getToken } from '@/utils/token'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, message, Row, Image } from 'antd'
import Layout from 'antd/lib/layout'
import { FC, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import styles from './login.module.sass'

interface CaptchaProps {
  img: string
  id: string
}

/**
 * 登录页面
 */
const Login: FC = () => {
  if (getToken()) {
    return <Navigate to='/' replace />
  }
  const [messageApi, contextHolder] = message.useMessage()
  const [captcha, setCaptcha] = useState<CaptchaProps>({} as CaptchaProps)
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const captchaRef = useRef<any>(null)
  const onFinish = (values: any) => {
    login({
      username: values.username,
      password: values.password,
      captchaId: captcha.id,
      verifyCode: values.captcha
    }).then(res => {
      dispatch(setUserInfo(res.data.user))
      navigate('/')
    })
  }
  // 验证验证码是否匹配
  const getCaptchas = async () => {
    const res = await getCaptcha()
    setCaptcha(res.data)
  }
  useLayoutEffect(() => {
    getCaptchas()
  }, [])
  // 调用子组件的handleClick方法
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
            onFinishFailed={getCaptchas}
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
                  <Image src={captcha.img} data-captchaId={captcha.id} onClick={getCaptchas} />
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
