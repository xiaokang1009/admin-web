import { randomColor, randomFont, randomText } from '@/utils/random'
import { FC, useEffect, useImperativeHandle, useState } from 'react'

interface IProps {
  changeCaptcha: (captchaId: string) => void
  cRef?: React.RefObject<any>
}

export const Captcha: FC<IProps> = props => {
  return <></>
}
