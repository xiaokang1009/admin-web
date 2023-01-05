/**
 * 全局用户管理
 *
 */

import { createSlice } from '@reduxjs/toolkit'

export type userProps = {
  nickname: string
  headerImg: string
  uuid: string
  authority: any
  sideMode: string
  activeColor: string
  baseColor: string
  isShowProgress: boolean
}

const initialState: userProps = {
  nickname: '',
  headerImg: '',
  uuid: '',
  authority: [],
  sideMode: 'vertical',
  activeColor: '#1890ff',
  baseColor: '#1890ff',
  isShowProgress: true
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer
